export { Doctor };

// doctor.js --- psychological help for frustrated users.

// Copyright (C) 1985, 1987, 1994, 1996 Free Software Foundation, Inc.

// Maintainer: theokrueger
// Keywords: games

// This file is part of doctor.js.

// doctor.js is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.

// doctor.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with doctor.js; see the file COPYING.  If not, write to the
// Free Software Foundation, Inc., 59 Temple Place - Suite 330,
// Boston, MA 02111-1307, USA.

/// Commentary:

// The single entry point `doctor', simulates a Rogerian analyst using
// phrase-production techniques similar to the classic ELIZA demonstration
// of pseudo-AI.

// This file was for a while censored by the Communications Decency Act.
// Some of its features were removed.  The law was promoted as a ban
// on pornography, but it bans far more than that.  The doctor program
// did not contain pornography, but part of it was prohibited
// nonetheless.

// The Supreme Court overturned the Communications Decency Act, but
// Congress is sure to look for some other way to try to end free speech.
// For information on US government censorship of the Internet, and
// what you can do to protect freedom of the press, see the web
// site http://www.vtw.org/
// See also the file etc/CENSORSHIP in the Emacs distribution
// for a discussion of why and how this file was censored, and the
// political implications of the issue.

// Code:
/* HELPERS */
function member(a, b) {
  if (typeof a !== "object") {
    a = [a];
  }
  return a.some((x) => b.some((y) => x === y));
}

function memq(a, b) {
  return member(a, b);
}

function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function cdr(lst) {
  return lst.length >= 1 ? lst.slice(1) : [];
}

function car(lst) {
  return lst.length >= 1 ? [lst[0]] : [];
}

function cadr(lst) {
  return lst.length >= 2 ? [lst[1]] : [];
}

function caddr(lst) {
  return lst.length >= 3 ? [lst[2]] : [];
}

function cddr(lst) {
  return lst.length >= 3 ? lst.slice(2) : [];
}

function random(i) {
  return Math.floor(Math.random() * i);
}

function dollar(lst) {
  // UNFAITHFUL kinda
  const front = lst.shift();
  lst.push(front);
  return front;
}

function slashslash(lst) {
  if (typeof lst == "object") {
    return lst.length > 0 ? lst[0] : "";
  } else if (typeof lst == "string") {
    return lst;
  }
  return lst.toString();
}

function randlist(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

function indexwrappedlist(lst, i) {
  return lst[i % lst.length];
}

/* Doctor */
class Doctor {
  constructor() {
    this.history = [];
    this.found = [];
    this.owner = [];
    this.subj = [];
    this.obj = [];
    this.feared = [];
    this.repetitive_shortness = [0, 0];
    this.mad = [];
    this.rms_flag = false;
    this.eliza_flag = false;
    this.zippy_flag = false;
    this.suicide_flag = false;
    this.lover = "your partner";
    this.bak = [];
    this.lincount = 0;
    this.print_upcase = [];
    this.print_space = [];
    this.howdy_flag = [];
    this.object = [];
    this.sent = [];
    this.typos = [
      ["theyll", "they'll", "they will"],
      ["theyre", "they're", "they are"],
      ["hes", "he's", "he is"],
      ["he7s", "he's", "hes is"],
      ["im", "i'm", "you are"],
      ["i7m", "i'm", "you are"],
      ["isa", "isa a", "is a"],
      ["thier", "their", "their"],
      ["dont", "don't", "do not"],
      ["don7t", "don't", "do not"],
      ["you7re", "you're", "i am"],
      ["you7ve", "you've", "i have"],
      ["you7ll", "you'll", "i will"],
    ];
    this.doctor_correction = {};
    this.doctor_expansion = {};
    this.typos.forEach((a) => {
      this.doctor_correction[a[0]] = a[1];
      this.doctor_expansion[a[1]] = a[2];
    });
    this.repdict = {
      my: "your",
      me: "you",
      you: "me",
      your: "my",
      mine: "yours",
      yours: "mine",
      our: "your",
      ours: "yours",
      we: "you",
      dunno: "do not know",
      // ;; "yes": "",
      "no,": "",
      "yes,": "",
      ya: "i",
      aint: "am not",
      wanna: "want to",
      gimme: "give me",
      gotta: "have to",
      gonna: "going to",
      never: "not ever",
      "doesn't": "does not",
      "don't": "do not",
      "aren't": "are not",
      "isn't": "is not",
      "won't": "will not",
      "can't": "cannot",
      "haven't": "have not",
      "i'm": "you are",
      ourselves: "yourselves",
      myself: "yourself",
      yourself: "myself",
      "you're": "i am",
      "you've": "i have",
      "i've": "you have",
      "i'll": "you will",
      "you'll": "i shall",
      "i'd": "you would",
      "you'd": "i would",
      here: "there",
      please: "",
      "eh,": "",
      eh: "",
      "oh,": "",
      oh: "",
      "shouldn't": "should not",
      "wouldn't": "would not",
      // "won't": "will not", /* UNFAITHFUL but makes no difference, duplicate key */
      "hasn't": "has not",
    };
    this.meanings = {
      howdy: "howdy",
      hi: "howdy",
      greetings: "howdy",
      hello: "howdy",
      tops20: "mach",
      "tops-20": "mach",
      tops: "mach",
      pdp11: "mach",
      computer: "mach",
      unix: "mach",
      machine: "mach",
      computers: "mach",
      machines: "mach",
      pdp11s: "mach",
      foo: "mach",
      foobar: "mach",
      multics: "mach",
      macsyma: "mach",
      teletype: "mach",
      la36: "mach",
      vt52: "mach",
      zork: "mach",
      trek: "mach",
      startrek: "mach",
      advent: "mach",
      pdp: "mach",
      dec: "mach",
      commodore: "mach",
      vic: "mach",
      bbs: "mach",
      modem: "mach",
      baud: "mach",
      macintosh: "mach",
      vax: "mach",
      vms: "mach",
      ibm: "mach",
      pc: "mach",
      bitching: "foul",
      shit: "foul",
      bastard: "foul",
      damn: "foul",
      damned: "foul",
      hell: "foul",
      suck: "foul",
      sucking: "foul",
      sux: "foul",
      ass: "foul",
      whore: "foul",
      bitch: "foul",
      asshole: "foul",
      shrink: "foul",
      pot: "toke",
      grass: "toke",
      weed: "toke",
      marijuana: "toke",
      acapulco: "toke",
      columbian: "toke",
      tokin: "toke",
      joint: "toke",
      toke: "toke",
      toking: "toke",
      "tokin'": "toke",
      toked: "toke",
      roach: "toke",
      pills: "drug",
      dope: "drug",
      acid: "drug",
      lsd: "drug",
      speed: "drug",
      heroin: "drug",
      hash: "drug",
      cocaine: "drug",
      uppers: "drug",
      downers: "drug",
      loves: "loves",
      love: "love",
      loved: "love",
      hates: "hates",
      dislikes: "hates",
      hate: "hate",
      hated: "hate",
      dislike: "hate",
      stoned: "state",
      drunk: "state",
      drunken: "state",
      high: "state",
      horny: "state",
      blasted: "state",
      happy: "state",
      paranoid: "state",
      wish: "desire",
      wishes: "desire",
      want: "desire",
      desire: "desire",
      like: "desire",
      hope: "desire",
      hopes: "desire",
      desires: "desire",
      wants: "desire",
      // desires: "desire", // UNFAITHFUL but makes zero difference since it is a dupe
      likes: "desire",
      needs: "desire",
      need: "desire",
      frustrated: "mood",
      depressed: "mood",
      annoyed: "mood",
      upset: "mood",
      unhappy: "mood",
      excited: "mood",
      worried: "mood",
      lonely: "mood",
      angry: "mood",
      mad: "mood",
      pissed: "mood",
      jealous: "mood",
      afraid: "fear",
      terrified: "fear",
      fear: "fear",
      scared: "fear",
      frightened: "fear",
      virginity: "sexnoun",
      virgins: "sexnoun",
      virgin: "sexnoun",
      cock: "sexnoun",
      cocks: "sexnoun",
      dick: "sexnoun",
      dicks: "sexnoun",
      cunt: "sexnoun",
      cunts: "sexnoun",
      prostitute: "sexnoun",
      condom: "sexnoun",
      sex: "sexnoun",
      rapes: "sexnoun",
      wife: "family",
      family: "family",
      brothers: "family",
      sisters: "family",
      parent: "family",
      parents: "family",
      brother: "family",
      sister: "family",
      father: "family",
      mother: "family",
      husband: "family",
      siblings: "family",
      grandmother: "family",
      grandfather: "family",
      maternal: "family",
      paternal: "family",
      stab: "death",
      murder: "death",
      murders: "death",
      suicide: "death",
      suicides: "death",
      kill: "death",
      kills: "death",
      killing: "death",
      die: "death",
      dies: "death",
      died: "death",
      dead: "death",
      death: "death",
      deaths: "death",
      pain: "symptoms",
      ache: "symptoms",
      fever: "symptoms",
      sore: "symptoms",
      aching: "symptoms",
      stomachache: "symptoms",
      headache: "symptoms",
      hurts: "symptoms",
      disease: "symptoms",
      virus: "symptoms",
      vomit: "symptoms",
      vomiting: "symptoms",
      barf: "symptoms",
      toothache: "symptoms",
      hurt: "symptoms",
      rum: "alcohol",
      gin: "alcohol",
      vodka: "alcohol",
      alcohol: "alcohol",
      bourbon: "alcohol",
      beer: "alcohol",
      wine: "alcohol",
      whiskey: "alcohol",
      scotch: "alcohol",
      fuck: "sexverb",
      fucked: "sexverb",
      screw: "sexverb",
      screwing: "sexverb",
      fucking: "sexverb",
      rape: "sexverb",
      raped: "sexverb",
      kiss: "sexverb",
      kissing: "sexverb",
      kisses: "sexverb",
      screws: "sexverb",
      fucks: "sexverb",
      because: "conj",
      but: "conj",
      however: "conj",
      besides: "conj",
      anyway: "conj",
      that: "conj",
      except: "conj",
      why: "conj",
      how: "conj",
      until: "when",
      when: "when",
      whenever: "when",
      while: "when",
      since: "when",
      rms: "rms",
      stallman: "rms",
      school: "school",
      schools: "school",
      skool: "school",
      grade: "school",
      grades: "school",
      teacher: "school",
      teachers: "school",
      classes: "school",
      professor: "school",
      prof: "school",
      profs: "school",
      professors: "school",
      mit: "school",
      emacs: "eliza",
      eliza: "eliza",
      liza: "eliza",
      elisa: "eliza",
      weizenbaum: "eliza",
      doktor: "eliza",
      athletics: "sports",
      baseball: "sports",
      basketball: "sports",
      football: "sports",
      frisbee: "sports",
      gym: "sports",
      gymnastics: "sports",
      hockey: "sports",
      lacrosse: "sports",
      soccer: "sports",
      softball: "sports",
      sports: "sports",
      swimming: "sports",
      swim: "sports",
      tennis: "sports",
      volleyball: "sports",
      math: "math",
      mathematics: "math",
      mathematical: "math",
      theorem: "math",
      axiom: "math",
      lemma: "math",
      algebra: "math",
      algebraic: "math",
      trig: "math",
      trigonometry: "math",
      trigonometric: "math",
      geometry: "math",
      geometric: "math",
      calculus: "math",
      arithmetic: "math",
      zippy: "zippy",
      //zippy: "zippy", // UNFAITHFUL but yet another dupe so is meaningless
      pinhead: "zippy",
      chat: "chat",
    };
    this.inter = ["well,", "hmmm... so,", "so", "...and", "then"];
    this.continue = ["continue", "proceed", "go on", "keep going"];
    this.relation = [
      "your relationship with",
      "something you remember about",
      "your feelings toward",
      "some experiences you have had with",
      "how you feel about",
    ];
    this.sure = ["sure", "positive", "certain", "absolutely sure"];
    this.afraidof = ["afraid of", "frightened by", "scared of"];
    this.areyou = ["are you", "have you been", "have you been"];
    this.isrelated = [
      "has something to do with",
      "is related to",
      "could be the reason for",
      "is caused by",
      "is because of",
    ];
    this.arerelated = [
      "have something to do with",
      "are related to",
      "could have caused",
      "could be the reason for",
      "are caused by",
      "are because of",
    ];
    this.maybe = ["maybe", "perhaps", "possibly"];
    this.whatwhen = ["what happened when", "what would happen if"];
    this.hello = [
      "how do you do?",
      "hello.",
      "howdy!",
      "hello.",
      "hi.",
      "hi there.",
    ];
    this.canyou = [
      "of course i can.",
      "why should i?",
      "what makes you think i would even want to?",
      "i am the doctor, i can do anything i damn please.",
      "not really, it's not up to me",
      "depends, how important is it?",
      "i could, but i don't think it would be a wise thing to do.",
      "can you?",
      "maybe i can, maybe i can't...",
      "i don't think i should do that.",
    ];
    this.want = ["want", "desire", "wish", "want", "hope"];
    this.feelingsAbout = [
      "feelings about",
      "apprehensions toward",
      "thoughts on",
      "emotions toward",
    ];
    this.randomAdjective = [
      "vivid",
      "emotionally stimulating",
      "exciting",
      "boring",
      "interesting",
      "recent",
      "random", // ;How can we omit this?
      "unusual",
      "shocking",
      "embarassing",
    ];
    this.whysay = [
      "why do you say",
      "what makes you believe",
      "are you sure that",
      "do you really think",
      "what makes you think",
    ];
    this.isee = ["i see...", "yes,", "i understand.", "oh."];
    this.please = [
      "please,",
      "i would appreciate it if you would",
      "perhaps you could",
      "please",
      "would you please",
      "why don't you",
      "could you",
    ];
    this.bye = [
      "my secretary will send you a bill.",
      "bye bye.",
      "see ya",
      "ok, talk to you later.",
      "ok, have fun.",
      "ciao.",
    ];
    this.something = ["something", "more", "how you feel"];
    this.things = [
      // ;"your interests in computers", // ;; let's make this less computer oriented
      // ;"the machines you use",
      "your plans",
      // ;"your use of computers",
      "your life",
      // ;"other machines you use",
      "the people you hang around with",
      // ;"computers you like",
      // "problems at school", /* UNFAITHFUL, executive decision to remove this one */
      "any hobbies you have",
      // ;"other computers you use",
      "your sex life",
      "hangups you have",
      "your inhibitions",
      "some problems in your childhood",
      // ;"knowledge of computers",
      "some problems at home",
    ];
    this.describe = [
      "describe",
      "tell me about",
      "talk about",
      "discuss",
      "tell me more about",
      "elaborate on",
    ];
    this.ibelieve = [
      "i believe",
      "i think",
      "i have a feeling",
      "it seems to me that",
      "it looks like",
    ];
    this.problems = [
      "problems",
      "inhibitions",
      "hangups",
      "difficulties",
      "anxieties",
      "frustrations",
    ];
    this.bother = [
      "does it bother you that",
      "are you annoyed that",
      "did you ever regret",
      "are you sorry",
      "are you satisfied with the fact that",
    ];
    this.improve = ["improve", "be better", "be improved", "be higher"];
    this.abusewords = [
      "boring",
      "bozo",
      "clown",
      "clumsy",
      "cretin",
      "dumb",
      "dummy",
      "fool",
      "foolish",
      "gnerd",
      "gnurd",
      "idiot",
      "jerk",
      "lose",
      "loser",
      "louse",
      "lousy",
      "luse",
      "luser",
      "moron",
      "nerd",
      "nurd",
      "oaf",
      "oafish",
      "reek",
      "stink",
      "stupid",
      "tool",
      "toolish",
      "twit",
    ];
    this.howareyoulst = [
      "how are you",
      "hows it going",
      "hows it going eh",
      "how's it going",
      "how's it going eh",
      "how goes it",
      "whats up",
      "whats new",
      "what's up",
      "what's new",
      "howre you",
      "how're you",
      "how's everything",
      "how is everything",
      "how do you do",
      "how's it hanging",
      "que pasa",
      "how are you doing",
      "what do you say",
    ];
    this.whereoutp = ["huh", "remem", "rthing"];

    this.bye = [
      "good bye",
      "see you later",
      "i quit",
      "so long",
      "go away",
      "this.lost",
    ];

    this.byecmd = [
      "bye",
      "halt",
      "break",
      "quit",
      "done",
      "exit",
      "goodbye",
      "stop",
      "pause",
      "bye,",
      "goodbye,",
    ];

    // UNFAITHFUL internal trackers for getter dollar sign equivalents
    this.sexlst_cnt = -1;
    this.foullst_cnt = -1;
    this.qlist_cnt = -1;
    this.longhuhlst_cnt = -1;
    this.huhlst_cnt = -1;
    this.drugs_cnt = -1;
    this.whywant_cnt = -1;
    this.drnk_cnt = -1;
    this.moods_cnt = -1;
    this.shortlst_cnt = -1;
    this.famlst_cnt = -1;
    this.machlst_cnt = -1;
    this.deathlst_cnt = -1;
    this.neglst_cnt = -1;
    this.beclst_cnt = -1;
    this.shortbeclst_cnt = -1;
    this.thlst_cnt = -1;
    this.remlst_cnt = -1;
    this.states_cnt = -1;
    this.stallmanlst_cnt = -1;
    this.schoollst_cnt = -1;
    this.elizalst_cnt = -1;
    this.sportslst_cnt = -1;
    this.mathlst_cnt = -1;
    this.zippylst_cnt = -1;
    this.chatlst_cnt = -1;
    this.abuselst_cnt = -1;
  }

  /* GETTERS FOR SUBSTITUTE STRINGS */
  /* ALL OF THESE MAY BE SUBTLY UNFAITHFUL TO ELISP BEHAVIOUR */
  /* TODO FIX CYCLE ISSUE */
  get fears() {
    ++this.fears_cnt;
    let l = [
      () => {
        return `${dollar(this.whysay)} you are ${dollar(this.afraidof)} ${slashslash(this.feared)}?`;
      },
      () => {
        return `you seem terrified by ${slashslash(this.feared)}.`;
      },
      () => {
        return `when did you first feel ${dollar(this.afraidof)}  ${slashslash(this.feared)}?`;
      },
    ];
    return [indexwrappedlist(l, this.fears_cnt)()];
  }

  get moods() {
    ++this.moods_cnt;
    let l = [
      () => {
        return `${dollar(this.areyou)} ${slashslash(this.found)} often?`;
      },
      () => {
        return `what causes you to be ${slashslash(this.found)}?`;
      },
      () => {
        return `${dollar(this.whysay)} you are ${slashslash(this.found)}?`;
      },
    ];
    return [indexwrappedlist(l, this.moods_cnt)()];
  }

  get drnk() {
    ++this.drnk_cnt;
    let l = [
      () => {
        return `do you drink a lot of ${slashslash(this.found)}?`;
      },
      () => {
        return `do you get drunk often?`;
      },
      () => {
        return `${dollar(this.describe)} your drinking habits.`;
      },
    ];
    return [indexwrappedlist(l, this.drnk_cnt)()];
  }

  get drugs() {
    ++this.drugs_cnt;
    let l = [
      () => {
        return `do you use ${slashslash(this.found)} often?`;
      },
      () => {
        return `${dollar(this.areyou)} addicted to ${slashslash(this.found)}?`;
      },
      () => {
        return `do you realise that drugs can be very harmful?`;
      },
      () => {
        return `${dollar(this.maybe)} you should try to quit using ${slashslash(this.found)}.`;
      },
    ];
    return [indexwrappedlist(l, this.drugs_cnt)()];
  }

  get whywant() {
    ++this.whywant_cnt;
    let l = [
      () => {
        return `${dollar(this.whysay)} ${slashslash(this.subj)} might ${dollar(this.want)} ${slashslash(this.obj)}?`;
      },
      () => {
        return `how does it feel to want?`;
      },
      () => {
        return `why should ${slashslash(this.subj)} get ${slashslash(this.obj)}?`;
      },
      () => {
        return `when did ${slashslash(this.subj)} firt ${dollar(this.want)} ${slashslash(this.obj)}?`;
      },
      () => {
        return `${dollar(this.areyou)} obsessed with ${slashslash(this.obj)}?`;
      },
      () => {
        return `why should i give ${slashslash(this.obj)} to ${slashslash(this.subj)}?`;
      },
      () => {
        return `have you ever gotten ${slashslash(this.obj)}?`;
      },
    ];

    return [indexwrappedlist(l, this.whywant_cnt)()];
  }

  get shortlst() {
    ++this.shortlst_cnt;
    let l = [
      () => {
        return `can you elaborate on that?`;
      },
      () => {
        return `${dollar(this.please)} continue.`;
      },
      () => {
        return `go on, don't be afraid.`;
      },
      () => {
        return `i need a little more detail please.`;
      },
      () => {
        return `you're being a bit brief, ${dollar(this.please)} go into detail.`;
      },
      () => {
        return `can you be more explicit?`;
      },
      () => {
        return `and?`;
      },
      () => {
        return `${dollar(this.please)} go into more detail`;
      },
      () => {
        return `you aren't being very talkative today!`;
      },
      () => {
        return `is that all there is to it?`;
      },
      () => {
        return `why must you respond so briefly?`;
      },
    ];

    return [indexwrappedlist(l, this.shortlst_cnt)()];
  }

  get famlst() {
    ++this.famlst_cnt;
    let l = [
      () => {
        return `tell me ${dollar(this.something)} about ${slashslash(this.owner)} family.`;
      },
      () => {
        return `you seem to dwell on ${slashslash(this.owner)} family.`;
      },
      () => {
        return `${dollar(this.areyou)} hung up on ${slashslash(this.owner)} family?`;
      },
    ];

    return [indexwrappedlist(l, this.famlst_cnt)()];
  }

  get huhlst() {
    ++this.huhlst_cnt;
    let l = [
      () => {
        return `${dollar(this.whysay)} ${slashslash(this.sent)}?`;
      },
      () => {
        return `is it because of ${dollar(this.things)} that you say ${slashslash(this.sent)}?`;
      },
    ];

    return [indexwrappedlist(l, this.huhlst_cnt)()];
  }

  get longhuhlst() {
    ++this.longhuhlst_cnt;
    let l = [
      () => {
        return `${dollar(this.whysay)} that?`;
      },
      () => {
        return `i don't understand`;
      },
      () => {
        return `${dollar(this.thlst)}`;
      },
      () => {
        return `${dollar(this.areyou)} ${dollar(this.afraidof)} that?`;
      },
    ];

    return [indexwrappedlist(l, this.longhuhlst_cnt)()];
  }

  get machlst() {
    ++this.machlst_cnt;
    let l = [
      () => {
        return `you have your mind on ${slashslash(this.found)}, it seems.`;
      },
      () => {
        return `you think too much about ${slashslash(this.found)}.`;
      },
      () => {
        return `you should try taking your mind off of ${slashslash(this.found)}.`;
      },
      () => {
        return `are you a computer hacker?`;
      },
    ];
    return [indexwrappedlist(l, this.machlst_cnt)()];
  }

  get qlist() {
    ++this.qlist_cnt;
    let l = [
      () => {
        return `what do you think?`;
      },
      () => {
        return `i'll ask the questions, if you don't mind!`;
      },
      () => {
        return `i could ask the same thing myself.`;
      },
      () => {
        return `${dollar(this.please)} allow me to do the questioning.`;
      },
      () => {
        return `i have asked myself that question many times.`;
      },
      () => {
        return `${dollar(this.please)} try to answer that question yourself.`;
      },
    ];
    return [indexwrappedlist(l, this.qlist_cnt)()];
  }

  get foullst() {
    ++this.foullst_cnt;
    let l = [
      () => {
        return `${dollar(this.please)} watch your tongue!`;
      },
      () => {
        return `${dollar(this.please)} avoid such unwholesome thoughts.`;
      },
      () => {
        return `${dollar(this.please)} get your mind out of the gutter.`;
      },
      () => {
        return `such lewdness is not appreciated.`;
      },
    ];
    return [indexwrappedlist(l, this.foullst_cnt)()];
  }

  get deathlst() {
    ++this.deathlst_cnt;
    let l = [
      () => {
        return `this is not a healthy way of thinking.`;
      },
      () => {
        return `${dollar(this.bother)} you, too, may die someday?`;
      },

      () => {
        return `i am worried about your obsession with this topic!`;
      },

      () => {
        return `did you watch a lot of crime and violence on television as a child?`;
      },
    ];
    return [indexwrappedlist(l, this.deathlst_cnt)()];
  }

  get sexlst() {
    ++this.sexlst_cnt;
    let l = [
      () => {
        return `${dollar(this.areyou)} ${dollar(this.afraidof)} sex?`;
      },
      () => {
        return `${dollar(this.describe)} ${dollar(this.something)} about your sexual history.`;
      },
      () => {
        return `${dollar(this.please)} ${dollar(this.describe)} your sex life...`;
      },

      () => {
        return `${dollar(this.describe)} your  ${dollar(this.feelingsabout)} your sexual partner.`;
      },

      () => {
        return `${dollar(this.describe)} your most ${dollar(this.random_adjective)} sexual experience.`;
      },

      () => {
        return `${dollar(this.areyou)} satisfied with ${slashslash(this.lover)}...?`;
      },
    ];
    return [indexwrappedlist(l, this.sexlst_cnt)()];
  }

  get neglst() {
    ++this.neglst_cnt;
    let l = [
      () => {
        return `why not?`;
      },
      () => {
        return `${dollar(this.bother)} i ask that?`;
      },
      () => {
        return `why not?`;
      },
      () => {
        return `why not?`;
      },
      () => {
        return `how come?`;
      },
      () => {
        return `${dollar(this.bother)} i ask that?`;
      },
    ];
    return [indexwrappedlist(l, this.neglst_cnt)()];
  }

  get beclst() {
    ++this.beclst_cnt;
    let l = [
      () => {
        return `is it because ${slashslash(this.sent)} that you came to me?`;
      },
      () => {
        return `${dollar(this.bother)} ${slashslash(this.sent)}?`;
      },
      () => {
        return `when did you first know that ${slashslash(this.sent)}?`;
      },
      () => {
        return `is it the fact that ${slashslash(this.sent)} the real reason?`;
      },
      () => {
        return `does the fact that ${slashslash(this.sent)} explain anything else?`;
      },
      () => {
        return `${dollar(this.areyou)} ${dollar(this.sure)} ${slashslash(this.sent)}?`;
      },
    ];
    return [indexwrappedlist(l, this.beclst_cnt)()];
  }

  get shortbeclst() {
    ++this.shortbeclst_cnt;
    let l = [
      () => {
        return `${dollar(this.bother)} i ask you that?`;
      },
      () => {
        return `that's not much of an answer!`;
      },
      () => {
        return `${dollar(this.inter)} why won't you talk about it?`;
      },
      () => {
        return `speak up!`;
      },
      () => {
        return `${dollar(this.areyou)} ${dollar(this.afraidof)} talking about it?`;
      },
      () => {
        return `dont be ${dollar(this.afraidof)} elaborating`;
      },
      () => {
        return `${dollar(this.please)} do into more detail`;
      },
    ];
    return [indexwrappedlist(l, this.shortbeclst_cnt)()];
  }

  get thlst() {
    ++this.thlst_cnt;
    let l = [
      () => {
        return `${dollar(this.maybe)} ${dollar(this.things)} ${dollar(this.arerelated)} this.`;
      },
      () => {
        return `is it because of ${dollar(this.things)} that you are goint through all this?`;
      },
      () => {
        return `how do you reconcile ${dollar(this.things)}?`;
      },
      () => {
        return `${dollar(this.maybe)} this ${dollar(this.isrelated)} ${dollar(this.things)}?`;
      },
    ];
    return [indexwrappedlist(l, this.thlst_cnt)()];
  }

  get toklst() {
    ++this.toklst_cnt;
    let l = [
      () => {
        return `is this how you relax?`;
      },
      () => {
        return `how long have you been smoking grass?`;
      },
      () => {
        return `${dollar(this.areyou)} ${dollar(this.afraidof)} of being drawn to using harder stuff?`;
      },
    ];
    return [indexwrappedlist(l, this.toklst_cnt)()];
  }

  get states() {
    ++this.states_cnt;
    let l = [
      () => {
        return `do you get ${slashslash(this.found)} often?`;
      },
      () => {
        return `do you enjoy being ${slashslash(this.found)}?`;
      },
      () => {
        return `what makes you ${slashslash(this.found)}?`;
      },
      () => {
        return `how often ${dollar(this.areyou)} ${slashslash(this.found)}?`;
      },
      () => {
        return `when were you last ${slashslash(this.found)}?`;
      },
    ];
    return [indexwrappedlist(l, this.states_cnt)()];
  }

  get stallmanlst() {
    ++this.stallmanlst_cnt;
    let l = [
      () => {
        return `${dollar(this.describe)} your ${dollar(this.feelingsabout)} him.`;
      },
      () => {
        return `${dollar(this.areyou)} a friend of Stallman?.`;
      },
      () => {
        return `${dollar(this.bother)} Stallman is ${dollar(this.randomadjective)}?`;
      },
      () => {
        return `${dollar(this.ibelieve)} you are ${dollar(this.afriadof)} him.`;
      },
    ];
    return [indexwrappedlist(l, this.stallmanlst_cnt)()];
  }

  get schoollst() {
    ++this.schoollst_cnt;
    let l = [
      () => {
        return `${dollar(this.describe)} your ${slashslash(this.found)}.`;
      },
      () => {
        return `${dollar(this.bother)} your grades could  ${dollar(this.improve)}?`;
      },
      () => {
        return `${dollar(this.areyou)} ${dollar(this.afraidof)} ${slashslash(this.found)}?`;
      },
      () => {
        return `${dollar(this.maybe)} this ${dollar(this.isrelated)} to your attitude.`;
      },
      () => {
        return `${dollar(this.areyou)} absent often?`;
      },
      () => {
        return `${dollar(this.maybe)} you should study ${dollar(this.something)}.`;
      },
    ];
    return [indexwrappedlist(l, this.shoollst_cnt)()];
  }
  get elizalst() {
    ++this.elizalst_cnt;
    let l = [
      () => {
        return `${dollar(this.areyou)} ${dollar(this.sure)}?`;
      },
      () => {
        return `${dollar(this.ibelieve)} you have ${dollar(this.problems)} with ${slashslash(this.found)}.`;
      },
      () => {
        return `${dollar(this.whysay)} ${slashslash(this.sent)}?`;
      },
    ];
    return [indexwrappedlist(l, this.elizalst_cnt)()];
  }
  get sportslst() {
    ++this.sportslst_cnt;
    let l = [
      () => {
        return `tell me ${dollar(this.something)} about ${slashslash(this.found)}`;
      },
      () => {
        return `${dollar(this.describe)} ${dollar(this.relation)} ${slashslash(this.found)}.`;
      },
      () => {
        return `do you find ${slashslash(this.found)} ${dollar(this.randomadjective)}?`;
      },
    ];
    return [indexwrappedlist(l, this.sportslst_cnt)()];
  }

  get mathlst() {
    ++this.mathlst_cnt;
    let l = [
      () => {
        return `${dollar(this.describe)} ${dollar(this.something)} about math.`;
      },
      () => {
        return `${dollar(this.maybe)} your ${dollar(this.problems)} ${dollar(this.arerelated)} ${slashslash(this.found)}.`;
      },
      () => {
        return `i do'nt know much ${slashslash(this.found)}, but ${dollar(this.continue)}.`; // do'nt is [sic]
      },
    ];
    return [indexwrappedlist(l, this.mathlst_cnt)()];
  }

  get zippylst() {
    ++this.zippylst_cnt;
    let l = [
      () => {
        return `${dollar(this.areyou)} Zippy?`;
      },
      () => {
        return `${dollar(this.ibelieve)} you have some serious ${dollar(this.problems)}.`;
      },
      () => {
        return `${dollar(this.bother)} you are a pinhead?`;
      },
    ];
    return [indexwrappedlist(l, this.zippylst_cnt)()];
  }

  get chatlst() {
    ++this.chatlst_cnt;
    let l = [
      () => {
        return `${dollar(this.maybe)} we could chat.`;
      },
      () => {
        return `${dollar(this.please)} ${dollar(this.describe)} ${dollar(this.something)} about chat mode.`;
      },
      () => {
        return `${dollar(this.bother)} our discussion is so ${dollar(this.randomadjective)}`;
      },
    ];
    return [indexwrappedlist(l, this.chatlst_cnt)()];
  }

  get abuselst() {
    ++this.abuselst_cnt;
    let l = [
      () => {
        return `${dollar(this.please)} try to be less abusive.`;
      },
      () => {
        return `${dollar(this.describe)} why you call me ${slashslash(this.found)}`;
      },
      () => {
        return `i've had enough of you!`;
      },
    ];
    return [indexwrappedlist(l, this.abuselst_cnt)()];
  }

  /* UTILS */
  doctor_cadr(lst) {
    return car(cdr(lst));
  }
  doctor_caddr(lst) {
    return car(cdr(cdr(lst)));
  }
  doctor_cddr(lst) {
    return cdr(cdr(lst));
  }
  doctor_dollar(lst) {
    return dollar(lst); // UNFAITHFUL kinda
  }

  doctor_defq(sent) {
    this.found = [];
    let temp = [
      "means",
      "applies",
      "mean",
      "refers",
      "refer",
      "related",
      "similar",
      "defined",
      "associated",
      "linked",
      "like",
      "same",
    ];
    while (temp.length > 0) {
      if (memq(car(temp), sent)) {
        this.found = [car(temp)];
        temp = [];
      }
      temp = cdr(temp);
    }
    return this.found;
  }

  doctor_def(x) {
    return `the word ${x} means ${this.doctor_meaning(x)} to me`;
  }

  doctor_meaning(x) {
    return this.meanings[x] ?? "nil"; // nil is faithful here, although i'd prefer if it was 'nothing'
  }

  doctor_put_meaning(symb, val) {
    this.meanings[symb] = val;
  }

  doctor_fixup(sent) {
    return [cdr()].concat([cdr(sent)]); // TODO finish
  }

  doctor_shorten(sent) {
    let foo,
      retval = false;
    let temp = [
      "because",
      "but",
      "however",
      "besides",
      "anyway",
      "until",
      "while",
      "that",
      "except",
      "why",
      "how",
    ];
    while (temp.length > 0) {
      foo = memq(car(temp), sent);
      if (foo && foo.length > 3) {
        sent = foo;
        temp = []; // TODO
        retval = true;
      } else {
        temp = cdr(temp);
      }
    }
    return retval;
  }

  /* RUNTIME */
  ask(query) {
    ++this.lincount;
    let sent = query.toLowerCase().split(" ");
    if (typeof sent !== "object") {
      sent = [sent];
    }
    this.sent = sent;
    try {
      return this.doc();
    } catch (e) {
      return e;
    }
  }

  doc() {
    let s = "";
    if (eq(this.sent, ["foo"])) {
      s += `bar! ${dollar(this.please)} ${dollar(this.continue)}`;
    } else if (member(this.sent, this.howareyoulst)) {
      s += `i'm ok. ${dollar(this.describe)} yourself.`;
    } else if (
      member(this.sent, [
        "good bye",
        "see you later",
        "i quit",
        "so long",
        "go away",
        "get lost",
      ]) ||
      memq(car(this.sent), [
        "bye",
        "halt",
        "break",
        "quit",
        "done",
        "exit",
        "goodbye",
        "bye,",
        "stop",
        "pause",
        "goodbye,",
        "stop",
        "pause",
      ])
    ) {
      s += dollar(this.bye);
    } else if (
      eq(car(this.sent), ["you"]) &&
      memq(this.doctor_cadr(this.sent), this.abusewords)
    ) {
      this.found = this.doctor_cadr(this.sent);
      s += this.abuselst;
    } else if (eq(car(this.sent), "whatmeans")) {
      s += this.doctor_def(cadr(this.sent));
    } else if (eq(this.sent, ["parse"])) {
      s += ```subj = ${this.subj},  verb = ${this.verb} 
        object phrase = ${this.obj}, noun form = ${this.noun} 
        current keyword is = ${this.keyword},  most recent possessive is ${this.owner} 
        sentence used was...  ${slashslash(this.bak)}```;
    }
    // ;; else if (eq(car(this.sent) "forget")) {
    // ;;   this.sent = [];
    // ;;   s += `${dollar(this.isee)} ${dollar(this.please} ${dollar(this.continue)}`
    // ;; }
    else {
      if (this.doctor_defq(this.sent)) {
        this.doctor_define(this.sent, this.found);
      }
      if (this.sent.length > 12) {
        this.sent = this.doctor_shorten(this.sent);
      }
      this.sent = this.doctor_correct_spelling(
        this.doctor_replace(this.sent, this.repdict),
      );
      if (
        !memq("me", this.sent) &&
        !memq("i".this.sent) &&
        memq("am", this.sent)
      ) {
        this.sent = this.doctor_replace(this.sent, { am: "are" });
      }

      if (car(this.sent) == "yow") {
        this.doctor_zippy();
      } else if (this.sent.length < 2) {
        if (this.doctor_meaning(car(this.sent)) == "howdy") {
          this.doctor_howdy();
        } else {
          this.doctor_short();
        }
      } else {
        if (memq("am", this.sent)) {
          this.sent = this.doctor_replace(this.sent, { me: "i" });
        }
        this.sent = this.doctor_fixup(this.sent);
        if (car(this.sent) == "do" && this.doctor_cadr(this.sent) == "not") {
          if (random(3) == 0) {
            s += `are you ${dollar(this.afraidof)} that?`;
          } else if (random(2) == 0) {
            s += `don't tell me what to do. i am the psychiatrist here!`;
            this.doctor_rthing();
          } else {
            s += `${dollar(this.whysay)} that i shouldn't ${this.doctor_cddr(this.sent)}?`;
          }
          this.doctor_go(this.doctor_wherego(this.sent));
        }
      }
    }

    this.bak = this.sent;

    if (s === "") {
      throw new Error(
        "the doctor is unable to take your query at this time...",
      ); // unfaithful
    }

    return s;
  }
}

/// doctor.js ends here
