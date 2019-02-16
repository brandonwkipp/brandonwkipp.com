-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: kipp_blogs
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `author` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` text NOT NULL,
  `links` text NOT NULL,
  `text` text NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES ('Brandon W. Kipp/Sarah Barker','2016-06-03',1,'','','New day, different place. I feel as though I\'m long overdue for starting an actual blog. For the past three years, I\'ve been running Maple Tree Studio with my colleague, Dr. Ian Nie, in Beloit, Wisconsin. I loved it. I love mentoring artists and recording many of the bands that made up the campus’ flourishing music scene. I met so many creative and talented people and got paid to do something I loved. Most importantly, I experienced real life issues never discussed during my musical education—like how to troubleshoot around the seemingly endless quirks of software/hardware that could derail a session and plunge morale down to the point of no return. Luckily, I\'m pretty good at troubleshooting and could usually fix the problems. Those problems were my original inspiration for creating a web-based audio editor. I’ve seen too many people be intimidated by the limited (and expensive) options for creating new sounds. I got to work, and almost a year later, my application has the potential to shake up the industry by creating an affordable, intuitive, and powerful user experience. I’ve moved to Minneapolis to foster a career in creating the kind of user-friendly technology I want to see in the world, and I\'m confident I\'ll create what I\'m looking to find.','Hello World'),('Brandon W. Kipp/Sarah Barker','2016-06-08',2,'','','Everything is in its place, and every place has its thing. The last thing I want to do is to spend my entire life organizing my life. How much organization is really necessary? Enough to put your mind at ease. These walls aren\'t your home. No walls could ever enclose what you call home. Life knows no bounds. It cannot be contained. It must be strange to be an architect. They design with strength and permanence in mind, but a building is no more permanent than a painting. A popular painting, even when lost a millennium ago, survives in replicas. Even our strongest structures would collapse in a few hundred years without human care. You can make prints of paintings. You can make replicas of buildings, but the experience cannot be replicated. Artists experience art as they create it. What we see is one infinitely long degree away from true art. When you organize that dirty plate, that moldy pizza at the back of the fridge, and that old receipt, you are arranging a gallery. ','Organization'),('Brandon W. Kipp/Sarah Barker','2016-06-19',3,'','https://color.adobe.com, tool','Today, I\'m updating the color scheme on my website. I\'ve never really researched color theory before today, but there is quite a bit of information out there. I read a few blogs and was vaguely reminded of my high school art class, but I didn\'t really pay attention back then. Anyway, I found this rad [link] where you can pick color templates based on dividing the color wheel in attractive ways. The old color scheme I was using was terrible, but to be fair, I had no idea how to pick good colors. It has got me thinking about the way things are packaged, and how satisfying a simple color scheme is. I\'m sure I\'m more likely to buy a product if its color scheme is pleasing to me.','Colors'),('Brandon W. Kipp/Sarah Barker','2016-06-28',4,'','http://advances.sciencemag.org/content/1/10/e1501136, article','Today my girlfriend brought home a Cherry Tomato plant today from a local church. It\'s pretty small, but it’s growing so fast I swear I can see it move. I\'ve got this UV grow light that only emits the relevant wavelengths for photosynthesis. It\'s sort of pink, and reminiscent of a nightclub—much different from the cheery yellow that we normally experience. It’s easy to take plants for granted, but we have a lot to learn from them. An [link] that came out a while back discusses roses that were made to hold electrical circuits. What does that mean for the future? Maybe if trees were able to transmit WiFi, we would stop cutting them down.','Tomato Plant'),('Brandon W. Kipp/Sarah Barker','2016-07-06',5,'','','The vast majority of humans do math in Base 10; we\'ve got 10 symbols (0-9), and all our numbers come from those 10 symbols in differing combinations. The binary language that computers understand is in Base 2, comprised of only 0’s and 1’s. Base 64, by contrast, utilizes uppercase A-Z, lowercase a-z, 0-9, \'+\', and \'/\' which adds up to 64 different characters. We use Base 64 as a method of encoding large sets of data. Computers sometimes misinterpret binary strings, but Base 64 ensures that data is rendered correctly for the end user. Currently, I\'m using it to cache HTML5 canvases for my new web app, SoundSword. Base16, aka Hexadecimal, is less efficient then using Base64, so that’s why I’m using it. It works well and loads my canvases much faster than redrawing them every time the page loads. I originally made the mistake of storing the Base 64 strings in my MySQL database, but the cached images can take up 100,000 characters of code or more; reading them from the database could cause a serious strain on the network. Now I store the cached files in a directory. Which brings me to my next challenge: storing audio files. While a directory has more than enough storage for tiny canvases, audio files comprise millions of characters of code in Base 64. Even the limp melody of a Taylor Swift song would cause the browser to run out of memory and crash. I\'ve got a couple of ideas, but I\'m not sure they will work. Updates coming soon.','Based x 64 (sunglasses emoji)'),('Brandon W. Kipp/Sarah Barker','2016-07-13',6,'pad-jack','https://en.wikipedia.org/wiki/Biff_Blumfumgagnge, person, https://github.com/brandonwkipp/DrumDuino, here','For years now, I have dreamed of building a hardware MIDI device. I initially got the inspiration after learning that the Rock Band drum set has MIDI capabilities. So, I bought a used one at Goodwill and proceeded to rip it apart. Upon examining the insides of the pads, I was pleasantly surprised that these mysterious devices were nothing more than a piezo sensor glued to a rubber circle. I’d learned about piezos when I was in school for Audio Engineering. My teacher (no, I’m not making this [link] up), Biff U. Blumfumgagnge, came riding into class one day with his MIDI equipped bicycle. [break] MIDI. Equipped. Bicycle. [break] There were piezos all over the thing and he explained how they worked and I\'ve never been the same. At the moment, it was clear that creating a MIDI controller is incredibly simple and absolutely in reach of anyone who dreamt of doing it. Inspired, I took my ripped up Rock Band drum set pads, soldered an input jack to its piezo, and screwed the pad and jack to a block of wood. After assembly, I grabbed my Arduino Uno and came up with a basic sketch for testing purposes (check it out [link]). After creating a makeshift box out of some old cardboard and some quick soldering, it was up and running. I hooked everything up and tapped the pad with a drum stick and voila, MIDI. I felt like a wizard. It was very rewarding to combine my love of music with my new love of code. More updates soon.','DRUMDUINO (Arduino Midi Project) pt. 1');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-16  0:42:13
