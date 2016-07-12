-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2016 at 09:02 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personal`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `author` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`author`, `date`, `id`, `text`, `title`) VALUES
('Brandon W. Kipp/Sarah Barker', '2016-06-03', 1, '', 'Hello World'),
('Brandon W. Kipp/Sarah Barker', '2016-06-05', 2, 'Everything is in its place, and every place has its thing. The last thing I want to do is to spend my entire life organizing my life. How much organization is really necessary? Enough to put your mind at ease. These walls aren\'t your home. No walls could ever enclose what you call home. Life knows no bounds. It cannot be contained. It must be strange to be an architect. They design with strength and permanence in mind, but a building is no more permanent than a painting. A popular painting, even when lost a millennium ago, survives in replicas. Even our strongest structures would collapse in a few hundred years without human care. You can make prints of paintings. You can make replicas of buildings, but the experience cannot be replicated. Artists experience art as they create it. What we see is one infinitely long degree away from true art. When you organize that dirty plate, that moldy pizza at the back of the fridge, and that old receipt, you are arranging a gallery. ', 'Organization'),
('Brandon W. Kipp/Sarah Barker', '2016-06-06', 3, 'Today, I\'m updating the color scheme on my website. I\'ve never really researched color theory before today, but there is quite a bit of information out there. I read a few blogs and was vaguely reminded of my high school art class, but I didn\'t really pay attention back then. Anyway, I found this rad tool at https://color.adobe.com where you can pick color templates based on dividing the color wheel in attractive ways. The old color scheme I was using was terrible, but to be fair, I had no idea how to pick good colors. It has got me thinking about the way things are packaged, and how satisfying a simple color scheme is. I\'m sure I\'m more likely to buy a product if its color scheme is pleasing to me.', 'Colors'),
('Brandon W. Kipp/Sarah Barker', '2016-06-07', 4, 'Today my girlfriend brought home a Cherry Tomato plant today from a local church. It\'s pretty small, but it’s growing so fast I swear I can see it move. I\'ve got this UV grow light that only emits the relevant wavelengths for photosynthesis. It\'s sort of pink, and reminiscent of a nightclub—much different from the cheery yellow that we normally experience. It’s easy to take plants for granted, but we have a lot to learn from them. An <a href=”http://advances.sciencemag.org/content/1/10/e1501136”>article</a> that came out recently discusses roses that were made to hold electrical circuits. What does that mean for the future? Maybe if trees were able to transmit WiFi, we would stop cutting them down.', 'Tomato Plant'),
('Brandon W. Kipp/Sarah Barker', '2016-07-09', 5, 'The vast majority of humans do math in Base 10; we\'ve got 10 symbols (0-9), and all our numbers come from those 10 symbols in differing combinations. The binary language that computers understand is in Base 2, comprised of only 0’s and 1’s. Base 64, by contrast, utilizes uppercase A-Z, lowercase a-z, 0-9, \'+\', and \'/\' which adds up to 64 different characters. We use Base 64 as a method of encoding large sets of data. Computers sometimes misinterpret binary strings, but Base 64 ensures that data is rendered correctly for the end user. Currently, I\'m using it to cache HTML5 canvases for my new web app, SoundSword. Base16, aka Hexadecimal, is less efficient then using Base64, so that’s why I’m using it. It works well and loads my canvases much faster than redrawing them every time the page loads. I originally made the mistake of storing the Base 64 strings in my MySQL database, but the cached images can take up 100,000 characters of code or more; reading them from the database could cause a serious strain on the network. Now I store the cached files in a directory. Which brings me to my next challenge: storing audio files. While a directory has more than enough storage for tiny canvases, audio files comprise millions of characters of code in Base 64. Even the limp melody of a Taylor Swift song would cause the browser to run out of memory and crash. I\'ve got a couple of ideas, but I\'m not sure they will work. Updates coming soon.', 'Based x 64 (sunglasses emoji)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
