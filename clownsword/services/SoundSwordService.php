<?php

namespace Services;

use Models\Database;
use Models\User;

class SoundSwordService {

    protected $db;

    protected $allowedExtensions = array('wav', 'mp3');

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function getProjectById($projectId)
    {
        $this->db->query("SELECT * FROM projects WHERE project_id='" . $this->db->filterParameter($projectId) . "'");
        return $this->db->getFirstResult();
    }

    public function getProjectsForUser($userId)
    {
        $this->db->query("SELECT * FROM projects WHERE user_id='" . $this->db->filterParameter($userId) . "'");
        return $this->db->getResults();
    }

    public function getTracksForUser($userId)
    {
        $this->db->query("SELECT * FROM tracks WHERE user_id='" . $this->db->filterParameter($userId) . "'");
        return $this->db->getResults();
    }

    public function getTracksForProject($projectId)
    {
        $this->db->query("SELECT t.* FROM tracks t LEFT JOIN project_track_assn a ON (a.track_id = t.track_id) WHERE a.project_id='" . $this->db->filterParameter($projectId) . "'");
        return $this->db->getResults();
    }

    public function getTrackById($trackId)
    {
        $this->db->query("SELECT * FROM tracks WHERE track_id='" . $this->db->filterParameter($trackId) . "' LIMIT 1");
        return $this->db->getFirstResult();
    }

    public function getDataForProject($projectId)
    {
        $this->db->query("SELECT data FROM project_data WHERE project_id='" . $this->db->filterParameter($projectId) . "' LIMIT 1");
        $results = $this->db->getResults();
        if (!is_null($results) && count($results) == 1)
        {
            return $results[0]['data'];
        }

        return null;
    }

    public function createProject(User $user, $projectName)
    {
        $projectName = trim($projectName);
        $hashedProjectName = md5($projectName);

        $existingProjectResult = $this->db->query("SELECT project_id FROM projects WHERE user_id='" . $user->id . "' AND hash='" . $hashedProjectName . "' LIMIT 1");

        if (!is_null($existingProjectResult->getResults()))
        {
            throw new \Exception('Project already exists');
        }

        $this->db->query("INSERT INTO projects (user_id, name, hash) VALUES ('" . $user->id . "', '" . $this->db->filterParameter($projectName) . "', '" . $hashedProjectName . "')");
        if ($this->db->getInsertId() > 0)
        {
            return $this->db->getInsertId();
        }

        throw new \Exception('Something went wrong');
    }

    public function addTrackForUser(User $user, $rawTrackFile)
    {
        if (is_null($rawTrackFile))
        {
            throw new \Exception('No track file provided');
        }

        $file = $rawTrackFile;
        $fileName = $file['name'];
        $tempName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];
        $fileHash = md5($fileName);

        $fileExtensions = explode('.', $fileName);
        $fileExtension = strtolower(end($fileExtensions));

        if (!in_array($fileExtension, $this->allowedExtensions))
        {
            throw new \Exception('Track not allowed. Allowed formats: ' . implode(', ', $this->allowedExtensions));
        }

        if ($fileError !== 0)
        {
            throw new \Exception($fileError);
        }

        $raw_destination = '../users/' . $user->username . '/raw_audio_assets/' . $fileHash;
        if (!copy($tempName, $raw_destination))
        {
            throw new \Exception('Problem copying raw track file');
        }

        $fileString = file_get_contents($tempName);
        $base64 = base64_encode($fileString);
        $enc_destination = '../users/' . $user->username . '/enc_audio_assets/' . $fileHash;

        if (!file_put_contents($enc_destination, $base64))
        {
            throw new \Exception('Problem copying enc track file');
        }

        $existingTrackResult = $this->db->query("SELECT track_id FROM tracks WHERE user_id='" . $user->id . "' AND path='" . $fileHash . "' LIMIT 1");

        if (!is_null($existingTrackResult->getResults()))
        {
            $track = $existingTrackResult->getFirstResult();
            return $track['track_id'];
        }

        $this->db->query("INSERT INTO tracks (user_id, title, path, size) VALUES ('" . $user->id . "', '" . $this->db->filterParameter($fileName) . "', '" . $fileHash . "', '" . $fileSize . "')");

        $insertId = $this->db->getInsertId();

        if (is_null($insertId) || $insertId == 0)
        {
            throw new \Exception('Something went wrong');
        }

        return $insertId;
    }

    public function addTrackToProject($trackId, $projectId, $userId)
    {
        $trackId = (int) $trackId;
        $projectId = (int) $projectId;
        $userId = (int) $userId;

        $ownerResult = $this->db->query("SELECT id FROM users WHERE id='" . $this->db->filterParameter($userId) . "' LIMIT 1");
        if (is_null($ownerResult->getResults()))
        {
            throw new \Exception('User not found');
        }

        $ownerResult = $this->db->query("SELECT track_id FROM tracks WHERE track_id='" . $this->db->filterParameter($trackId) . "' AND user_id='" . $this->db->filterParameter($userId) . "' LIMIT 1");
        if (is_null($ownerResult->getResults()))
        {
            throw new \Exception('Track not found');
        }

        $ownerResult = $this->db->query("SELECT project_id FROM projects WHERE project_id='" . $this->db->filterParameter($projectId) . "' AND user_id='" . $this->db->filterParameter($userId) . "' LIMIT 1");
        if (is_null($ownerResult->getResults()))
        {
            throw new \Exception('Cannot add track to someone else\'s project');
        }

        $assnResult = $this->db->query("SELECT * FROM project_track_assn WHERE track_id='" . $this->db->filterParameter($trackId) . "' AND project_id='" . $this->db->filterParameter($projectId) . "' LIMIT 1");
        if (!is_null($assnResult->getResults()))
        {
            return true;
        }

        $this->db->query("INSERT INTO project_track_assn (project_id, track_id) VALUES ('" . $this->db->filterParameter($projectId) . "', '" . $this->db->filterParameter($trackId) . "')");

        return ($this->db->getInsertId() > 0);
    }

    public function saveProjectData($projectId, $data, $userId)
    {
        $ownerResult = $this->db->query("SELECT project_id FROM projects WHERE project_id='" . $this->db->filterParameter($projectId) . "' AND user_id='" . $this->db->filterParameter($userId) . "' LIMIT 1");
        if (is_null($ownerResult))
        {
            throw new \Exception('Cannot save project data to someone else\'s project');
        }

        $this->db->query("
          INSERT INTO project_data (project_id, data) VALUES ('" . $this->db->filterParameter($projectId) . "', '" . $this->db->filterParameter($data) . "')
          ON DUPLICATE KEY UPDATE data='" . $this->db->filterParameter($data) . "'
        ");

        return ($this->db->getInsertId() > 0);
    }

}
