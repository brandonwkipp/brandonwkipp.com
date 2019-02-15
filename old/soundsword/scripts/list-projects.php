<?php
require_once '../init.php';

$userService->checkForAutoLoginKey();
$user = $userService->getUserFromSession();

$projects = $soundSwordService->getProjectsForUser($user->id);
$currentProjectId = (isset($_GET['id']) ? (int) $_GET['id'] : 0);

if (is_null($projects))
{
    echo 'No projects created';
}
else
{
    $projectOptions = '<div style="margin-top:20px;"><label>Load Existing Project</label><br /><select name="projectLoad" onchange="if (this.selectedOptions[0].value > 0 && this.selectedOptions[0].value != ' . $currentProjectId . ') loadProject(this.selectedOptions[0].value);"><option>Select a Project</option>';
    foreach ($projects as $project)
    {
        $projectId = $project['project_id'];
        $selected = ($projectId == $currentProjectId) ? ' selected="selected"' : '';
        $projectOptions .= '<option value="' . $projectId . '"' . $selected . '>' . $project['name'] . '</option>';
    }
    $projectOptions .= '</select></div>';
    echo $projectOptions;
}

?>
