// Terms configuration for content filtering
export const tagalogTerms = {
  offensive: [
    // Personal insults
    'bobo', 'tanga', 'gago', 'ulol', 'inutil', 'tarantado', 'engot', 'ungas', 
    'baliw', 'abnormal', 'tae', 'bwisit', 'loko', 'sira ulo', 'hangal', 'gunggong', 
    'timang', 'hinayupak', 'hayop', 'demonyo', 'tabogo', 'mangmang', 'estupido', 
    'walang kwenta', 'walang silbi', 'walang utak', 'walang isip', 'ugok', 'tanga-tanga',
    'boba', 'bobita', 'bobo-bobo', 'hangal', 'halang', 'tangang', 'gaga', 'gagita',
    'palamunin', 'pabigat', 'walang hiyang', 'walang hiya', 'walanghiya', 'walang modo',
    'bastos', 'baboy', 'bakulaw', 'bruha', 'dungis', 'dugyot', 'amoy', 'mabaho',
    
    // Additional personal insults
    'tanga-tangahan', 'bobo-bohanan', 'inutil na tao', 'walang kuwentang tao',
    'walang silbing nilalang', 'walang alam', 'walang pinag-aralan', 'walang modo',
    'walang galang', 'walang respeto', 'walang breeding', 'walang asal', 'walang delicadeza',
    'walang kahihiyan', 'walang dignidad', 'walang prinsipyo', 'walang paninindigan',
    'walang bayag', 'walang itlog', 'duwag', 'takot', 'kriminal', 'salot', 'peste',
    
    // Regional variations
    'buang', 'libog', 'bugo', 'yawa', 'pisting', 'pisteng', 'pistin', 'piste',
    'baliw', 'sira', 'luko-luko', 'baliw-baliwan', 'sira-sira', 'luko',
    'buang-buang', 'libog-libog', 'bugo-bugo', 'yawa-yawa', 'pisting-yawa',

    // Behavioral insults
    'pakialamero', 'tsismosa', 'tsismoso', 'epal', 'feeling', 'arte', 'ksp', 
    'papansin', 'mayabang', 'hambog', 'sipsip', 'plastik', 'plastic', 'paasa',
    'pabebe', 'pasikat', 'nagmamaganda', 'nagmamagaling', 'nagmamarunong',
    'nagmamatalino', 'nagmamalaki', 'nagpapahalata', 'nagpapadala',
    
    // Additional behavioral insults
    'maarte', 'feelingera', 'feelingero', 'pa-cool', 'pa-cute', 'pa-sexy',
    'pa-virgin', 'pa-innocent', 'pa-santo', 'pa-santa', 'pa-bida', 'pa-victim',
    'pa-importante', 'pa-special', 'pa-sosyal', 'social climber', 'trying hard',
    'wannabe', 'poser', 'faker', 'balimbing', 'traydor', 'taksil', 'duwag',
    'mandurugas', 'mandaraya', 'magnanakaw', 'sinungaling', 'babaero', 'manloloko',
    
    // Appearance-based insults
    'pangit', 'panget', 'mukang', 'mukhang', 'maitim', 'tabachoy', 'balyena',
    'bakulaw', 'unggoy', 'matsing', 'chaka', 'kalbo', 'payat', 'patpatin',
    'kapre', 'duwende', 'tiyanak', 'aswang', 'manananggal', 'mangkukulam',
    
    // Additional appearance insults
    'mukhang unggoy', 'mukhang baboy', 'mukhang kalabaw', 'mukhang kabayo',
    'mukhang palaka', 'mukhang butiki', 'mukhang ahas', 'mukhang daga',
    'mukhang ipis', 'mukhang langaw', 'mukhang lamok', 'mukhang bangaw',
    'pangit na hayop', 'kalbo na unggoy', 'tabang manok', 'payat na daga',
    'taba ng baboy', 'itim na uling', 'mukhang multo', 'mukhang patay',
    'mukhang zombie', 'mukhang bangkay', 'mukhang bampira'
  ],

  sensitive: [
    // Violence and crime
    'patay', 'dugo', 'sakit', 'sugat', 'aksidente', 'kamatayan', 'disgrasya', 
    'trahedya', 'sakuna', 'krimen', 'nakaw', 'holdap', 'barilan', 'saksak', 'away',
    'gulpi', 'bugbog', 'sapak', 'suntok', 'tadyak', 'sampal', 'palo', 'latay',
    'lagot', 'laglag', 'bato', 'taga', 'baril', 'itak', 'patalim', 'kutsilyo',
    'daga', 'lasog', 'pasabog', 'bomba', 'granada', 'baril', 'bala', 'punyal',
    
    // Additional violence terms
    'massacre', 'pagpatay', 'pagpaslang', 'pagkitil', 'pagdukot', 'kidnap',
    'pangidnap', 'panggagahasa', 'pananakit', 'pambubugbog', 'pananaksak',
    'pamamaril', 'pagbabaril', 'pagpatay', 'pagkawala', 'pagtatago', 'pagtakas',
    'pagnanakaw', 'pagnanakawan', 'panloloob', 'pangho-holdap', 'pangongotong',
    'pangongotong', 'pangungupit', 'pangungulimbat', 'pangungurakot',

    // Discrimination and hate
    'diskriminasyon', 'rasismo', 'kapootang', 'pagtatangi', 'pangmamata', 
    'pangaapi', 'pangmamaliit', 'pangungutya', 'panghahamak', 'pangmamata',
    'pangmamaliit', 'pangungutya', 'panghahamak', 'pangmamata', 'pangmamaliit',
    
    // Additional discrimination terms
    'kapootang panlahi', 'diskriminasyon sa lahi', 'diskriminasyon sa kulay',
    'diskriminasyon sa kasarian', 'diskriminasyon sa edad', 'diskriminasyon sa relihiyon',
    'diskriminasyon sa katayuan', 'diskriminasyon sa antas', 'diskriminasyon sa pinagmulan',
    'pangmamaliit sa mahihirap', 'pangmamata sa mahihirap', 'pangungutya sa mahihirap',
    'panghahamak sa kapus-palad', 'pangmamaliit sa may kapansanan',

    // Social issues
    'kahirapan', 'gutom', 'kawalan', 'kakulangan', 'karahasan', 'kaguluhan',
    'giyera', 'digmaan', 'labanan', 'bakbakan', 'barilan', 'patayan', 'sakitan',
    'pagpatay', 'pagpaslang', 'pagkitil', 'pagkawala', 'pagkasira', 'pagkawasak',
    
    // Additional social issues
    'kahirapang lubos', 'matinding gutom', 'kakulangan sa pagkain',
    'kakulangan sa edukasyon', 'kakulangan sa trabaho', 'kakulangan sa pera',
    'kakulangan sa gamot', 'kakulangan sa pangangalaga', 'kakulangan sa atensyon',
    'kakulangan sa pagmamahal', 'kakulangan sa respeto', 'kakulangan sa dignidad',
    'kakulangan sa karapatan', 'kakulangan sa hustisya', 'kakulangan sa katarungan'
  ],

  profanity: [
    // Common profanity
    'putang ina', 'putangina', 'puta', 'pakyu', 'leche', 'kupal', 'tangina', 
    'punyeta', 'pesteng yawa', 'yawa', 'hindot', 'bwisit', 'kingina', 'kengkoy',
    'putragis', 'putcha', 'pucha', 'pakshet', 'pakingshet', 'letse', 'leching',
    'lintik', 'hinayupak', 'hayop', 'hayup', 'hudas', 'hunyeta', 'gago', 'gaga',
    
    // Additional common profanity
    'putanginang yan', 'putang inang yan', 'putang ina mo', 'putangina mo',
    'tangina mo', 'tangina mo po', 'tanginamo', 'tanginamoka', 'tanginang yan',
    'pakyu ka', 'pakyu mo', 'pakyung pakyu', 'leche ka', 'lechugas',
    'kupal ka', 'kupalan', 'kupalang yan', 'pesteng yawa ka', 'pesteng yawang yan',

    // Sexual references
    'puke', 'puday', 'titi', 'bayag', 'burat', 'ratbu', 'kantot', 'iyot', 'libog',
    'kalibugan', 'jakol', 'tamod', 'tungaw', 'tungaw', 'puwit', 'pwet', 'pwerta',
    'pekpek', 'pepe', 'bilat', 'bulbul', 'kipay', 'etits', 'betlog', 'nota',
    
    // Additional sexual references
    'pukengina', 'pukinangina', 'pukingina', 'kantutan', 'iyutan', 'kantot',
    'iyot', 'chupa', 'tsupa', 'subo', 'finger', 'fingerin', 'himas', 'himasin',
    'salsal', 'salsalin', 'libog', 'libugan', 'kalibugan', 'kaliwasan',
    'bastos', 'malibog', 'malanding', 'malaswa', 'bastos', 'kalaswaan',

    // Combined forms
    'putanginamo', 'tangina mo', 'tanginamoka', 'pakingshetka', 'gago ka',
    'hindot ka', 'kupal ka', 'leche ka', 'bwisit ka', 'yawa ka', 'hayop ka',
    'hinayupak ka', 'pesteng yawa ka', 'punyeta ka', 'pakyu ka',
    
    // Additional combined forms
    'putangina mong hayop ka', 'tangina mong gago ka', 'pakyu kang kupal ka',
    'leche kang hinayupak ka', 'bwisit kang yawa ka', 'hayop kang pesteng yawa ka',
    'punyeta kang pakyu ka', 'gago kang hindot ka', 'kupal kang leche ka',
    'yawa kang bwisit ka', 'pesteng yawa kang hinayupak ka'
  ],

  jejemon: {
    // Basic jeje variations
    offensive: [
      'b0b0', 'b0bo', 'bob0', 'b0b0h', 'bOb0', 'bObO', 'b0bz',
      't@nga', 't@ng@', 'tnga', 'tng@', 't@ngaah',
      'g@go', 'g@g0', 'g@g0h', 'gag0', 'g@gz',
      'ul0l', 'ul0lz', 'ul0lzz', 'uL0L', 'uLoL',
      'bOang', 'bU@ng', 'bw@ng', 'bCrazy',
      'tng4', 't@ng4', 'b0b4', 'g4g0', 'ul0l4',
      'eNg0t', '3ng0t', '3ng0tz', 'eng0tz',
      'ung@s', 'ung@sz', 'unggoy', 'ungg0y',
      'w4l4ng kw3nt4', 'w4l4ng silb3',
      'w4l4ng ut4k', 'w4l4ng isip'
    ],

    // Jeje profanity
    profanity: [
      'put@', 'put@ng in@', 'put@ngin@',
      'p0t@', 'p0t@ng 1n@', 'p0t@ng1n@',
      'p@kyu', 'p@ky0', 'p@ks', 'p@ks u',
      'l3ch3', 'l3tch3', 'l3tch3ng',
      'kup@l', 'kup@lz', 'kup@lxz',
      't@ng1n@', 't@ng1n@ m0',
      'y@w@', 'y@w@ k@', 'y@w@aa',
      'pXt@', 'pXt@ng1n@', 'pXt@ngin@',
      'pWt@', 'pWt@ng 1n@', 'pWt@ng1n@',
      'pUt@', 'pUt@ng 1n@', 'pUt@ng1n@',
      'g@g0 k@', 'g@g0 kh@', 'g@g0 q@'
    ],

    // Common variations
    patterns: [
      // Letter replacements
      'a -> @',
      'e -> 3',
      'i -> 1',
      'o -> 0',
      's -> z',
      'x -> ks',
      
      // Letter combinations
      'ah -> @h',
      'eh -> 3h',
      'oh -> 0h',
      
      // Repeated letters
      'z -> zz',
      's -> zz',
      'h -> hh',
      
      // Word endings
      'zz -> zzz',
      'xx -> xxx',
      'h -> hzz'
    ]
  }
};

export const englishTerms = {
  offensive: [
    // Personal insults
    'stupid', 'idiot', 'dumb', 'moron', 'fool', 'imbecile', 'dimwit', 'numbskull', 
    'dunce', 'nitwit', 'halfwit', 'bonehead', 'ignorant', 'mindless', 'brainless',
    'retard', 'retarded', 'dumbass', 'dumbo', 'simpleton', 'nincompoop', 'buffoon',
    'clown', 'loser', 'failure', 'good-for-nothing', 'worthless', 'useless', 'pathetic',
    'lowlife', 'scum', 'scumbag', 'degenerate', 'delinquent', 'miscreant', 'wretch',
    
    // Additional personal insults
    'numbnut', 'birdbrain', 'airhead', 'pinhead', 'lamebrain', 'pea-brain',
    'knucklehead', 'blockhead', 'meathead', 'dolt', 'doofus', 'dweeb', 'nimrod',
    'ignoramus', 'imbecile', 'cretin', 'dullard', 'dimwit', 'half-wit', 'witless',
    'brainless wonder', 'mental midget', 'village idiot', 'intellectual pygmy',
    
    // Intelligence-based insults
    'brain-dead', 'brain-damaged', 'mentally challenged', 'cognitively impaired',
    'intellectually bankrupt', 'cerebrally deficient', 'mentally defective',
    'cognitively deficient', 'intellectually challenged', 'mentally vacant',
    'brain-lacking', 'thought-deficient', 'intelligence-free', 'wisdom-lacking',

    // Behavioral insults
    'annoying', 'irritating', 'obnoxious', 'insufferable', 'intolerable', 'unbearable',
    'arrogant', 'conceited', 'egotistical', 'narcissistic', 'self-centered', 'selfish',
    'attention-seeker', 'show-off', 'pretentious', 'fake', 'phony', 'hypocrite',
    'two-faced', 'backstabber', 'traitor', 'snitch', 'rat', 'snake', 'weasel',
    
    // Additional behavioral insults
    'drama queen', 'attention whore', 'narcissist', 'egomaniac', 'megalomaniac',
    'control freak', 'manipulator', 'gaslighter', 'toxic person', 'sociopath',
    'psychopath', 'sadist', 'bully', 'abuser', 'predator', 'creep', 'stalker',
    'pervert', 'deviant', 'freak', 'weirdo', 'psycho', 'nutcase', 'lunatic',

    // Appearance-based insults
    'ugly', 'hideous', 'grotesque', 'disgusting', 'repulsive', 'revolting', 'nasty',
    'filthy', 'dirty', 'gross', 'fat', 'obese', 'skinny', 'anorexic', 'bulimic',
    'deformed', 'disfigured', 'monstrous', 'beast', 'pig', 'cow', 'whale', 'monkey',
    
    // Additional appearance insults
    'butterface', 'fugly', 'dog-faced', 'horse-faced', 'pizza-faced', 'troll-faced',
    'goblin-faced', 'ogre-looking', 'gargoyle', 'hag', 'witch', 'monster', 'beast',
    'wildebeest', 'gorilla', 'ape', 'baboon', 'chimpanzee', 'orangutan', 'slob',
    'sloven', 'mess', 'disaster', 'trainwreck', 'catastrophe', 'eyesore'
  ],

  sensitive: [
    // Violence and crime
    'death', 'blood', 'injury', 'wound', 'accident', 'tragedy', 'disaster', 'catastrophe', 
    'crime', 'murder', 'theft', 'robbery', 'shooting', 'stabbing', 'fight', 'assault',
    'attack', 'kill', 'killed', 'killing', 'dead', 'died', 'dying', 'fatal', 'lethal',
    'deadly', 'murderous', 'homicide', 'suicide', 'genocide', 'massacre', 'slaughter',
    
    // Additional violence terms
    'bloodbath', 'carnage', 'butchery', 'bloodshed', 'gore', 'mutilation',
    'dismemberment', 'decapitation', 'execution', 'assassination', 'liquidation',
    'elimination', 'extermination', 'annihilation', 'eradication', 'obliteration',
    'termination', 'destruction', 'devastation', 'demolition', 'ruination',
    
    // Crime-related terms
    'rape', 'molestation', 'abuse', 'assault', 'battery', 'violence', 'brutality',
    'torture', 'torment', 'suffering', 'agony', 'anguish', 'misery', 'pain',
    'trauma', 'victimization', 'exploitation', 'oppression', 'subjugation',

    // Discrimination
    'racist', 'racism', 'discrimination', 'prejudice', 'bigot', 'bigotry', 'hate',
    'hatred', 'xenophobia', 'homophobia', 'transphobia', 'islamophobia', 'antisemitism',
    'sexist', 'sexism', 'misogyny', 'misogynist', 'misandry', 'misandrist',
    'ageism', 'ableism', 'classism', 'elitism', 'supremacist', 'supremacy',
    
    // Additional discrimination terms
    'racial profiling', 'racial bias', 'racial prejudice', 'racial discrimination',
    'gender bias', 'gender discrimination', 'sexual discrimination', 'age discrimination',
    'disability discrimination', 'religious discrimination', 'ethnic discrimination',
    'cultural discrimination', 'social discrimination', 'economic discrimination',

    // Social issues
    'poverty', 'hunger', 'starvation', 'famine', 'disease', 'epidemic', 'pandemic',
    'plague', 'virus', 'infection', 'contamination', 'pollution', 'destruction',
    'devastation', 'corruption', 'exploitation', 'oppression', 'persecution',
    'torture', 'abuse', 'harassment', 'bullying', 'violence', 'warfare', 'terrorism',
    
    // Additional social issues
    'homelessness', 'unemployment', 'inequality', 'injustice', 'discrimination',
    'marginalization', 'disenfranchisement', 'exploitation', 'victimization',
    'stigmatization', 'ostracization', 'alienation', 'isolation', 'segregation',
    'gentrification', 'displacement', 'eviction', 'foreclosure', 'bankruptcy'
  ],

  profanity: [
    // Common profanity
    'fuck', 'shit', 'bitch', 'ass', 'asshole', 'bastard', 'damn', 'hell', 'crap',
    'piss', 'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut', 'motherfucker',
    'fucker', 'fucking', 'shitting', 'bullshit', 'horseshit', 'chickenshit',
    'dipshit', 'jackass', 'douchebag', 'dumbfuck', 'fuckface', 'fuckhead',
    
    // Additional common profanity
    'goddamn', 'goddam', 'goddammit', 'damnit', 'dammit', 'sonofabitch',
    'son of a bitch', 'son-of-a-bitch', 'piece of shit', 'piece-of-shit',
    'shithead', 'shitstain', 'shitface', 'shitbag', 'scumbag', 'scum',
    'dirtbag', 'asshat', 'asswipe', 'dickwad', 'dickhead', 'dickface',

    // Sexual references
    'penis', 'vagina', 'testicles', 'balls', 'nuts', 'tits', 'boobs', 'breasts',
    'nipples', 'anal', 'anus', 'rectum', 'cock', 'dick', 'pussy', 'cunt', 'twat',
    'snatch', 'beaver', 'cum', 'jizz', 'semen', 'sperm', 'ejaculate', 'orgasm',
    
    // Additional sexual references
    'fellatio', 'cunnilingus', 'rimming', 'rimjob', 'blowjob', 'handjob',
    'fingering', 'fisting', 'masturbation', 'masturbate', 'jerking off',
    'wanking', 'humping', 'fucking', 'screwing', 'banging', 'porking',
    'boning', 'drilling', 'pounding', 'ramming', 'shafting', 'stuffing',

    // Combined forms
    'motherfucking', 'cocksucker', 'cocksucking', 'assfucker', 'assfucking',
    'dickhead', 'dickface', 'fuckwit', 'fucktard', 'shithead', 'shitface',
    'bitchass', 'dumbshit', 'bullshitter', 'asswipe', 'douchebag', 'douchecanoe',
    
    // Additional combined forms
    'motherfucking asshole', 'fucking piece of shit', 'goddamn son of a bitch',
    'fucking douchebag', 'stupid motherfucker', 'dumb piece of shit',
    'fucking idiot', 'fucking moron', 'fucking retard', 'fucking asshole',
    'fucking dickhead', 'fucking bastard', 'fucking bitch', 'fucking cunt'
  ],

  jejemon: {
    // Basic jeje variations
    offensive: [
      'stup1d', 'stup1dz', 'st00p1d', 'st00p1dz',
      '1d10t', '1di0t', '1d1ot', '1d10tz',
      'dumB', 'dumb0', 'dumBzz', 'dumB@ss',
      'm0r0n', 'm0r0nz', 'm0r0n1c',
      'f00l', 'f00lz', 'f00l1sh',
      '1mb3c1l3', '1mb3s1l', '1mb3c1l',
      'br@1nl3ss', 'br@1nl3zz', 'br@1nless',
      'n00b', 'n00bz', 'n00b13', 'n00b1sh',
      'l0z3r', 'l0s3r', 'l0z3rz', 'l0s3rz',
      'l@m3', 'l@m3r', 'l@m3rz', 'l@m30'
    ],

    // Jeje profanity
    profanity: [
      'fvck', 'fvckk', 'fvcking',
      'fck', 'fcking', 'fckr',
      'sh1t', 'sh17', 'sh1zz',
      'b1tch', 'b17ch', 'b1tchh',
      '@ss', '@ssh0l3', '@ssh0le',
      'b@st@rd', 'b@st@rdz',
      'd1ck', 'd1ckh3@d', 'd1ckf@c3',
      'fvck1ng', 'fvck3r', 'fvck3d',
      'sh1th3@d', 'sh1tf@c3',
      '@ssw1p3', '@ssh@t'
    ],

    // Common variations
    patterns: [
      // Letter replacements
      'a -> @',
      'e -> 3',
      'i -> 1',
      'o -> 0',
      's -> z',
      't -> 7',
      'b -> 6',
      
      // Letter combinations
      'ck -> k',
      'ex -> x',
      'cs -> x',
      
      // Word modifications
      'er -> r',
      'or -> r',
      'ed -> d',
      
      // Common suffixes
      'z -> zz',
      'zz -> zzz',
      's -> z',
      'x -> xx'
    ]
  }
};

// Additional metadata about terms
export const termMetadata = {
  version: '2.1.0',
  lastUpdated: '2024-03-20',
  totalTerms: {
    tagalog: Object.values(tagalogTerms).reduce((acc, arr) => 
      typeof arr === 'object' && !Array.isArray(arr) 
        ? acc + Object.values(arr).filter(Array.isArray).reduce((sum, a) => sum + a.length, 0)
        : acc + arr.length, 0),
    english: Object.values(englishTerms).reduce((acc, arr) => 
      typeof arr === 'object' && !Array.isArray(arr)
        ? acc + Object.values(arr).filter(Array.isArray).reduce((sum, a) => sum + a.length, 0)
        : acc + arr.length, 0)
  },
  categories: ['offensive', 'sensitive', 'profanity', 'jejemon'],
  subcategories: {
    offensive: [
      'personal insults',
      'behavioral insults',
      'appearance-based insults',
      'intelligence-based insults'
    ],
    sensitive: [
      'violence and crime',
      'discrimination and hate',
      'social issues',
      'crime-related'
    ],
    profanity: [
      'common profanity',
      'sexual references',
      'combined forms'
    ],
    jejemon: [
      'basic variations',
      'letter replacements',
      'word modifications',
      'common patterns'
    ]
  },
  languages: ['tagalog', 'english'],
  features: [
    'regional variations',
    'compound words',
    'phrase detection',
    'context awareness',
    'jejemon variations',
    'leetspeak patterns',
    'text message style'
  ]
};

// Utility function to get all terms for a language
export function getAllTerms(language) {
  const terms = language.toLowerCase() === 'tagalog' ? tagalogTerms : englishTerms;
  return Object.values(terms).flat();
}

// Utility function to get terms by category
export function getTermsByCategory(language, category) {
  const terms = language.toLowerCase() === 'tagalog' ? tagalogTerms : englishTerms;
  return terms[category.toLowerCase()] || [];
}

// Utility function to check if a term exists
export function termExists(term, language) {
  const allTerms = getAllTerms(language);
  return allTerms.includes(term.toLowerCase());
}

// Utility function to get terms by subcategory
export function getTermsBySubcategory(language, category, subcategory) {
  const terms = language.toLowerCase() === 'tagalog' ? tagalogTerms : englishTerms;
  const categoryTerms = terms[category.toLowerCase()];
  if (!categoryTerms) return [];

  // Find terms between the subcategory comment and the next comment
  const termString = JSON.stringify(categoryTerms);
  const subcategoryPattern = new RegExp(`// ${subcategory}[^/]*?(//${'|$'})`);
  const match = termString.match(subcategoryPattern);
  if (!match) return [];

  const subcategorySection = match[0];
  return subcategorySection
    .split(',')
    .map(term => term.trim())
    .filter(term => term && !term.startsWith('//'));
}

// Utility function to get term statistics
export function getTermStatistics() {
  return {
    totalTerms: {
      tagalog: Object.values(tagalogTerms).reduce((acc, arr) => acc + arr.length, 0),
      english: Object.values(englishTerms).reduce((acc, arr) => acc + arr.length, 0)
    },
    categoryCounts: {
      tagalog: Object.entries(tagalogTerms).reduce((acc, [category, terms]) => {
        acc[category] = terms.length;
        return acc;
      }, {}),
      english: Object.entries(englishTerms).reduce((acc, [category, terms]) => {
        acc[category] = terms.length;
        return acc;
      }, {})
    },
    version: termMetadata.version,
    lastUpdated: termMetadata.lastUpdated
  };
}

// Utility function to search terms
export function searchTerms(query, options = {}) {
  const {
    language = 'both',
    category = 'all',
    caseSensitive = false,
    includeJejemon = true
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const results = [];

  const searchInLanguage = (terms, lang) => {
    Object.entries(terms).forEach(([cat, termList]) => {
      if (cat === 'jejemon' && includeJejemon) {
        Object.entries(termList).forEach(([subcat, jejeTerms]) => {
          if (Array.isArray(jejeTerms)) {
            jejeTerms.forEach(term => {
              const termToCheck = caseSensitive ? term : term.toLowerCase();
              if (termToCheck.includes(searchQuery)) {
                results.push({
                  term,
                  category: 'jejemon',
                  subcategory: subcat,
                  language: lang
                });
              }
            });
          }
        });
      } else if (category === 'all' || category === cat) {
        if (Array.isArray(termList)) {
          termList.forEach(term => {
            const termToCheck = caseSensitive ? term : term.toLowerCase();
            if (termToCheck.includes(searchQuery)) {
              results.push({
                term,
                category: cat,
                language: lang
              });
            }
          });
        }
      }
    });
  };

  if (language === 'both' || language === 'tagalog') {
    searchInLanguage(tagalogTerms, 'tagalog');
  }
  if (language === 'both' || language === 'english') {
    searchInLanguage(englishTerms, 'english');
  }

  return results;
}

// Add a new utility function for jejemon pattern generation
export function generateJejemonVariations(term, language = 'english') {
  const patterns = language.toLowerCase() === 'tagalog' 
    ? tagalogTerms.jejemon.patterns 
    : englishTerms.jejemon.patterns;

  let variations = [term];
  
  patterns.forEach(pattern => {
    const [from, to] = pattern.split('->').map(s => s.trim());
    variations = [...variations, ...variations.map(v => v.replace(new RegExp(from, 'g'), to))];
  });

  // Remove duplicates
  return [...new Set(variations)];
} 