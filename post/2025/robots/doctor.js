export { Doctor };

// doctor.js --- psychological help for frustrated users.

// Copyright (C) 1985, 1987, 1994, 1996 Free Software Foundation, Inc.

// Maintainer: theokrueger
// Keywords: games

// This file is part of theokrueger.dev.

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
  //b.some((x) => listeq([
}

function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function car(lst) {
  return lst.length >= 1 ? lst[0] : null;
}

function cadr(lst) {
  return lst.length >= 2 ? lst[1] : null;
}

function caddr(lst) {
  return lst.length >= 3 ? lst[2] : null;
}

function cddr(lst) {
  return lst.length >= 3 ? lst.slice(2) : null;
}

function dollar(lst) {
  const front = lst.shift();
  lst.push(front);
  return front;
}

function slashslash(lst) {
  return lst;
}

function doctor_cadr(lst) {
  return car(cdr(lst));
}

function doctor_caddr(lst) {
  return car(cdr(cdr(lst)));
}

function doctor_cddr(lst) {
  return cdr(cdr(lst));
}

function doctor_dollar(lst) {
  return dollar(lst);
}

function randlist(lst) {
  return lst[math.floor(math.random() * lst.length)];
}

function indexwrappedlist(lst, i) {
  return lst[i % lst.length];
}

/* Doctor */
class Doctor {
  constructor() {
    this.history = null;
    this.found = null;
    this.owner = null;
    this.subj = null;
    this.obj = null;
    this.feared = null;
    this.repetitiveShortness = 0;
    this.mad = null;
    this.rmsFlag = null;
    this.elizaFlag = null;
    this.zippyFlag = null;
    this.suicideFlag = null;
    this.lover = "your partner";
    this.bak = null;
    this.lincount = 0;
    this.printUpdase = null;
    this.printSpace = null;
    this.howdyFlag = null;
    this.object = null;
    this.typos = [
      ["theyll", "they'll", "they will"],
      ["theyre", "they're", "they are"],
      // TODO finish
    ];
    this.repldict = {
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
      //	  "yes": "",
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
      "won't": "will not",
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
      desires: "desire",
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
      zippy: "zippy",
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

    this.whywant = ["how does it feel to want"];

    this.canyou = ["what makes you think i would even want to"];

    this.want = ["want"];

    this.shortlst = ["can you elaborate on that"];

    this.famlst = ["tell me SOMETHING abuot OWNER family"];

    this.huhlst = ["WHYSAY SENT"];

    this.longhuhlst = ["WHYSAY that"];

    this.feelingsAbout = ["feelings about"];

    this.randomAdjective = ["vivid"];

    this.whysay = ["why do you say"];

    this.isee = ["i see"];

    this.please = ["perhaps you could"];

    this.bye = ["my secretary will send you a bill"];

    this.something = ["more"];

    this.things = ["your life"];

    this.describe = ["tell me about"];

    this.ibelieve = ["i believe"];

    this.problems = ["problems"];

    this.bother = ["are you sorry"];

    this.machlist = ["you have you mind on FOUND, it seems"];

    this.qlist = ["what do you think"];

    this.foullst = ["PLEASE watch your toungue!"];

    this.deathlst = ["this is not a healthy way of thinking"];

    this.sexlist = ["AREYOU AFRAIDOF sex"];

    this.neglst = ["why not"];

    this.beclst = ["is ti becaus SENT that you came to me"];

    this.shotbeclst = ["BOTHER i ask you that"];

    this.thlst = ["how do you reconcile THINGS"];

    this.remlst = ["earlier you said HISTORY"];

    this.toklst = ["is this how you relax"];

    this.states = ["do you this.FOUND often?"];

    this.stallmanlst = ["DESCRIBE your FEELINGSABOUT him"];

    this.schoollst = ["DESCRIBE your FOUND"];

    this.improve = ["be better"];

    this.elizalst = ["AREYOU SURE"];

    this.sportslst = ["tell me SOMETHING about FOUND"];

    this.mathlst = ["DESCRIBE SOMETHING about math"];

    this.zippylst = ["AREYOU Zippy?"];

    this.chatlst = ["MAYBE we could chat"];

    this.abuselst = ["PLEASE try to be less abusive"];

    this.abusewords = ["boring"];

    this.howareyoulst = ["how are you"];

    this.whereoutp = ["huh"];

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
  }

  /* GETTERS FOR SUBSTITUTE STRINGS */
  /* ALL OF THESE ARE SUBTLY UNFAITHFUL TO ELISP BEHAVIOUR */
  static fears_cnt = -1;
  get fears() {
    ++fears_cnt;
    let l = [
      `${dollar(this.whysay)} you are ${dollar(this.afraidof)} ${slashslash(this.feared)}?`,
      `you seem terrified by ${slashslash(feared)}.`,
      `when did you first feel ${dollar(this.afraidof)}  ${slashslash(feared)}?`,
    ];
    return [indexwrappedlist(l, fears_cnt)];
  }

  static moods_cnt = -1;
  get moods() {
    ++moods_cnt;
    let l = [
      `${dollar(this.areyou)} ${slashslash(this.found)} often?`,
      `what causes you to be ${slashslash(this.found)}?`,
      `${dollar(this.whysay)} you are ${slashslash(this.found)}?`,
    ];
    return [indexwrappedlist(l, moods_cnt)];
  }

  static drnk_cnt = -1;
  get drnk() {
    ++drnk_cnt;
    let l = [
      `do you drink a lot of ${slashslash(found)}?`,
      `do you get drunk often?`,
      `${dollar(this.describe)} your drinking habits.`,
    ];
    return [indexwrappedlist(l, drnk_cnt)];
  }

  static drugs_cnt = -1;
  get drugs() {
    ++drugs_cnt;
    let l = [
      `do you use ${slashslash(found)} often?`,
      `${dollar(this.areyou)} addicted to ${slashslash(this.found)}?`,
      `do you realise that drugs can be very harmful?`,
      `${dollar(this.maybe)} you should try to quit using ${slashslash(this.found)}.`,
    ];
    return [indexwrappedlist(l, drugs_cnt)];
  }

  /* RUNTIME */
  ask(query) {
    ++this.lincount;
    const sent = query.toLowerCase();
    try {
      return this.doc(sent, sent.split(" "));
    } catch (e) {
      return e;
    }
  }

  doc(sent) {
    let s = "";
    if (sent === "foo") {
      s += `bar! ${dollar(this.please)} ${dollar(this.continue)}`;
    }

    if (s === "") {
      throw new Error(
        "the doctor is unable to take your query at this time...",
      ); // unfaithful
    }

    return s;
  }
}

/// doctor.js ends here
