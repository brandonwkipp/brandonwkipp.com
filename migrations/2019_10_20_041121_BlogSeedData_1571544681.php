<?php

use Intersect\Blog\Models\Post;
use Intersect\Database\Migrations\AbstractSeed;

class BlogSeedData1571544681 extends AbstractSeed {

    public function populate()
    {
        Post::bulkCreate([
            [
                'id' => 1,
                'category_id' => NULL,
                'title' => 'Hello World',
                'slug' => 'hello-world',
                'body' => 'New day, different place. I feel as though I\'m long overdue for starting an actual blog. For the past three years, I\'ve been running Maple Tree Studio with my colleague, Dr. Ian Nie, in Beloit, Wisconsin. I loved it. I love mentoring artists and recording many of the bands that made up the campus\' flourishing music scene. I met so many creative and talented people and got paid to do something I loved. Most importantly, I experienced real life issues never discussed during my musical education—like how to troubleshoot around the seemingly endless quirks of software/hardware that could derail a session and plunge morale down to the point of no return. Luckily, I\'m pretty good at troubleshooting and could usually fix the problems. Those problems were my original inspiration for creating a web-based audio editor. I\'ve seen too many people be intimidated by the limited (and expensive) options for creating new sounds. I got to work, and almost a year later, my application has the potential to shake up the industry by creating an affordable, intuitive, and powerful user experience. I\'ve moved to Minneapolis to foster a career in creating the kind of user-friendly technology I want to see in the world, and I\'m confident I\'ll create what I\'m looking to find.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-06-03 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:45:"New day, different place. I feel as though...";}'
            ],
            [
                'id' => 2,
                'category_id' => NULL,
                'title' => 'Organization',
                'slug' => 'organization',
                'body' => 'Everything is in its place, and every place has its thing. The last thing I want to do is to spend my entire life organizing my life. How much organization is really necessary? Enough to put your mind at ease. These walls aren\'t your home. No walls could ever enclose what you call home. Life knows no bounds. It cannot be contained. It must be strange to be an architect. They design with strength and permanence in mind, but a building is no more permanent than a painting. A popular painting, even when lost a millennium ago, survives in replicas. Even our strongest structures would collapse in a few hundred years without human care. You can make prints of paintings. You can make replicas of buildings, but the experience cannot be replicated. Artists experience art as they create it. What we see is one infinitely long degree away from true art. When you organize that dirty plate, that moldy pizza at the back of the fridge, and that old receipt, you are arranging a gallery.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-06-08 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:50:"Everything is in its place, and every place has...";}'
            ],
            [
                'id' => 3,
                'category_id' => NULL,
                'title' => 'Colors',
                'slug' => 'colors',
                'body' => 'Today, I\'m updating the color scheme on my website. I\'ve never really researched color theory before today, but there is quite a bit of information out there. I read a few blogs and was vaguely reminded of my high school art class, but I didn\'t really pay attention back then. Anyway, I found this rad <a href="https://color.adobe.com">tool</a> where you can pick color templates based on dividing the color wheel in attractive ways. The old color scheme I was using was terrible, but to be fair, I had no idea how to pick good colors. It has got me thinking about the way things are packaged, and how satisfying a simple color scheme is. I\'m sure I\'m more likely to buy a product if its color scheme is pleasing to me.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-06-19 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:72:"Today, I\'m updating the color scheme on my website. I\'ve never really...";}'
            ],
            [
                'id' => 4,
                'category_id' => NULL,
                'title' => 'Tomato Plant',
                'slug' => 'tomato-plant',
                'body' => 'Today, my girlfriend brought home a Cherry Tomato plant from a local church. It\'s pretty small, but it\'s growing so fast I swear I can see it move. I\'ve got this UV grow light that only emits the relevant wavelengths for photosynthesis. It\'s sort of pink, and reminiscent of a nightclub—much different from the cheery yellow that we normally experience. It\'s easy to take plants for granted, but we have a lot to learn from them. An <a href="http://advances.sciencemag.org/content/1/10/e1501136">article</a> that came out a while back discusses roses that were made to hold electrical circuits. What does that mean for the future? Maybe if trees were able to transmit WiFi, we would stop cutting them down.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-06-28 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:63:"Today, my girlfriend brought home a Cherry Tomato plant from...";}'
            ],
            [
                'id' => 5,
                'category_id' => NULL,
                'title' => 'Based x 64 (Sunglasses Emoji)',
                'slug' => 'based-x-64-sunglasses-emoji',
                'body' => "The vast majority of humans do math in Base 10; we've got 10 symbols (0-9), and all our numbers come from those 10 symbols in differing combinations. The binary language that computers understand is in Base 2, comprised of only 0’s and 1’s. Base 64, by contrast, utilizes uppercase A-Z, lowercase a-z, 0-9, '+', and '/' which adds up to 64 different characters. We use Base 64 as a method of encoding large sets of data. Computers sometimes misinterpret binary strings, but Base 64 ensures that data is rendered correctly for the end user. Currently, I'm using it to cache HTML5 canvases for my new web app, SoundSword. Base16, aka Hexadecimal, is less efficient then using Base64, so that’s why I’m using it. It works well and loads my canvases much faster than redrawing them every time the page loads. I originally made the mistake of storing the Base 64 strings in my MySQL database, but the cached images can take up 100,000 characters of code or more; reading them from the database could cause a serious strain on the network. Now I store the cached files in a directory. Which brings me to my next challenge: storing audio files. While a directory has more than enough storage for tiny canvases, audio files comprise millions of characters of code in Base 64. Even the limp melody of a Taylor Swift song would cause the browser to run out of memory and crash. I've got a couple of ideas, but I'm not sure they will work. Updates coming soon.",
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-07-06 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:63:"The vast majority of humans do math in Base 10; we\'ve got 10...";}'
            ],
            [
                'id' => 6,
                'category_id' => NULL,
                'title' => 'Raspbeat Pt. 1',
                'slug' => 'raspbeat-pt-1',
                'body' => '<img src="/assets/images/pad-jack.png" align="left" />For years now, I have dreamed of building a hardware MIDI device. I initially got the inspiration after learning that the Rock Band drum set has MIDI capabilities. So, I bought a used one at Goodwill and proceeded to rip it apart. Upon examining the insides of the pads, I was pleasantly surprised that these mysterious devices were nothing more than a piezo sensor glued to a rubber circle. I\'d learned about piezos when I was in school for Audio Engineering. My teacher (no, I\'m not making this <a href="https://en.wikipedia.org/wiki/Biff_Blumfumgagnge">person</a> up), Biff U. Blumfumgagnge, came riding into class one day with his MIDI equipped bicycle.<br/><br/>MIDI. Equipped. Bicycle.<br/><br/>There were piezos all over the thing and he explained how they worked and I\'ve never been the same. At the moment, it was clear that creating a MIDI controller is incredibly simple and absolutely in reach of anyone who dreamt of doing it. Inspired, I took my ripped up Rock Band drum set pads, soldered an input jack to its piezo, and screwed the pad and jack to a block of wood. After assembly, I grabbed my Arduino Uno and came up with a basic sketch for testing purposes (check it out <a href="https://github.com/brandonwkipp/raspbeat">here</a>). After creating a makeshift box out of some old cardboard and some quick soldering, it was up and running. I hooked everything up and tapped the pad with a drum stick and voila, MIDI. I felt like a wizard. It was very rewarding to combine my love of music with my new love of code. More updates soon.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2016-07-13 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:88:"For years now, I have dreamed of building a hardware MIDI device. I initially got the...";}'
            ],
            [
                'id' => 7,
                'category_id' => NULL,
                'title' => 'Records',
                'slug' => 'records',
                'body' => 'How is it that I feel on top of the world one day, and not the next? Easy, every day is an opportunity to climb the mountain. Every day is a chance to be the best. Every day is gift to be squandered or to be utilized to maximum efficiency. When I\'m working on beats, sometimes it really just feels like I\'m not good enough. I can never seem to finish something, never find quite the right way I meant to express myself when I started. I\'m beginning to really believe that the day one starts a beat, is the day one finishes the beat. It\'s hard to remember what head space you were one, to remember all of those feelings, everything about that day is gone. When you revisit something like this, you end up adding your current mood to it. I guess in that way, these pieces of music are just piles of moods and energies across time, sort of like an emotional battery. Maybe that\'s why humans like music, presumably because artists pour themselves into the work and listeners can extrapolate out some sort of condolence or some sort of state of being with someone else, like if the music is happy. I guess I have to remember that these things aren\'t necessarily products that come flying off a machine, but are literal parts of my soul cobbled together across time. They\'re, you know, records.',
                'author_id' => 1,
                'status' => 1,
                'date_created' => '2019-03-04 00:00:00',
                'meta_data' => 'a:1:{s:7:"preview";s:57:"How is it that I feel on top of the world one day, and...";}'
            ]
        ]);
    }

}
