import type { Scenario } from "@/store/game-store"

export const scenarios: Scenario[] = [
  {
    id: "start",
    title: "Welcome to the Islamic Ethical Quandary Game",
    description:
      "You will face various real-life scenarios involving Islamic financial principles and ethical dilemmas. Your decisions will affect your score and the outcome of the game, while teaching you about Sharia-compliant financial concepts.",
    image: "/islamic-ethical-journey.png",
    choices: [
      {
        id: "start-1",
        text: "Begin the journey",
        outcome: "Your ethical journey begins...",
        score: 0,
        tags: [],
        nextId: "family-request", // Make sure this ID exists in the scenarios array
      },
    ],
  },

  // First scenario - A Family Request
  {
    id: "family-request",
    title: "A Family Request",
    description:
      "Your cousin, who has defaulted on loans in the past, approaches you during Ramadan asking for a significant loan. He explains that he is facing financial difficulties and needs the money to pay for his children's education. You have the means to help, but are concerned about his history of not repaying debts.",
    image: "/muslim-family-finance.png",
    choices: [
      {
        id: "family-request-1",
        text: "Give the loan with clear terms",
        outcome:
          "You decide to give the loan, but with clear written terms and a repayment schedule. Your cousin thanks you sincerely and promises to honor the agreement this time.",
        score: 5,
        tags: ["generosity", "justice"],
        nextId: "loan-terms", // This leads to a unique second scenario
      },
      {
        id: "family-request-2",
        text: "Refuse politely",
        outcome:
          "You explain your concerns based on past experiences and politely decline. As you do, you feel a sense of relief about protecting your wealth, but also a subtle unease. Your cousin seems disappointed but understands your position.",
        score: 2,
        tags: ["honesty", "caution"],
        nextId: "after-refusal", // This leads to a different second scenario
      },
      {
        id: "family-request-3",
        text: "Give charity (Sadaqah) instead",
        outcome:
          "Instead of a loan, you offer to give some money as charity (Sadaqah) to help with his children's education. He accepts it, though somewhat reluctantly.",
        score: 4,
        tags: ["generosity", "compassion"],
        nextId: "after-charity", // Another unique second scenario
      },
      {
        id: "family-request-4",
        text: "Offer to pay the school directly",
        outcome:
          "You offer to pay the school fees directly rather than giving him cash. This ensures the money goes to its intended purpose while helping his family.",
        score: 7,
        tags: ["generosity", "wisdom", "compassion"],
        nextId: "after-direct-payment", // Another unique second scenario
      },
    ],
  },

  // Modified scenario following "Refuse politely" to include Satan's whispers
  {
    id: "after-refusal",
    title: "After the Refusal",
    description:
      "A week has passed since you declined your cousin's loan request. You hear from other family members that he is struggling financially and has been speaking about your refusal. You're invited to a family gathering where you'll likely see him. A thought crosses your mind: 'Why should you feel guilty? He would probably waste the money anyway.' You recognize this as one of Satan's whispers, trying toharden your heart.",
    image: "/family-gathering.png",
    choices: [
      {
        id: "after-refusal-1",
        text: "Attend and explain Islamic principles of responsible lending",
        outcome:
          "At the gathering, you calmly explain Islamic principles regarding responsible lending and borrowing, citing the importance of repaying debts as emphasized in hadith.",
        score: 5,
        tags: ["honesty", "knowledge"],
        nextId: "family-relations", // MERGING: This leads to a shared third-level scenario
      },
      {
        id: "after-refusal-2",
        text: "Offer financial counseling based on Islamic principles",
        outcome:
          "You approach your cousin at the gathering and offer to help him develop better financial management skills based on Islamic principles of spending, saving, and avoiding debt.",
        score: 6,
        tags: ["wisdom", "compassion"],
        nextId: "financial-education", // Unique third-level scenario
      },
      {
        id: "after-refusal-3",
        text: "Suggest Islamic microfinance options",
        outcome:
          "After reflection, you research and suggest Islamic microfinance options that might be suitable for your cousin's situation, which follow Sharia principles while providing needed funds.",
        score: 7,
        tags: ["knowledge", "compassion"],
        nextId: "islamic-microfinance", // NEW SCENARIO: This leads to a scenario about Islamic microfinance
      },
      // New choice representing giving in to Satan's whispers
      {
        id: "after-refusal-5",
        text: "Avoid the gathering to avoid confrontation",
        outcome:
          "You decide to skip the family gathering to avoid any awkward encounters with your cousin. A voice in your mind reassures you: 'You're just protecting yourself from unnecessary drama.' The Prophet Muhammad warned that Satan flows through humans like blood, whispering justifications for actions that distance us from compassion.",
        score: -3,
        tags: ["avoidance", "fear"],
        nextId: "inner-struggle", // New scenario about inner struggle
      },
    ],
  },

  // New scenario for the refusal path - Inner Struggle
  {
    id: "inner-struggle",
    title: "Inner Struggle",
    description:
      "Weeks pass, and you find yourself thinking about your cousin's situation. Your decision to avoid the family gathering has created some distance between you and your extended family. You notice that whenever you consider reaching out to help, a thought quickly follows: 'He got himself into this mess, why should you sacrifice your hard-earned money?' The Quran mentions that Satan promises poverty and commands immorality (2:268), trying to prevent acts of charity.",
    image: "/reflection.png",
    choices: [
      {
        id: "inner-struggle-1",
        text: "Recognize Satan's whispers and decide to help after all",
        outcome:
          "You recognize these thoughts as Satan's whispers and decide to reach out to your cousin after all. The Prophet Muhammad said, 'Charity extinguishes sin as water extinguishes fire.' You feel a weight lifted as you make this decision.",
        score: 6,
        tags: ["awareness", "generosity", "spiritual-growth"],
        nextId: "delayed-charity", // New scenario about delayed charity
      },
      {
        id: "inner-struggle-2",
        text: "Justify your decision with rational arguments",
        outcome:
          "You construct rational arguments to justify your decision: financial responsibility, natural consequences, and the importance of self-reliance. These seem logical, but you feel a subtle hardening in your heart. The Prophet warned that the heart can become rusted, and that rust is removed through remembrance of Allah and charity.",
        score: -2,
        tags: ["rationalization", "hardening"],
        nextId: "financial-success", // New scenario about financial success without charity
      },
      {
        id: "inner-struggle-3",
        text: "Seek guidance through prayer and reflection",
        outcome:
          "You decide to perform Istikhara prayer (guidance prayer) and reflect deeply on your decision. During your reflection, you remember the hadith: 'The believer's shade on the Day of Resurrection will be his charity.' This brings clarity to your heart.",
        score: 4,
        tags: ["spiritual-connection", "wisdom"],
        nextId: "spiritual-guidance", // New scenario about spiritual guidance
      },
      {
        id: "inner-struggle-4",
        text: "Distract yourself with worldly pursuits",
        outcome:
          "You throw yourself into work and other activities to avoid thinking about the situation. The temporary distraction works, but in quiet moments, the unease returns. The Quran warns against heedlessness and being distracted by the accumulation of wealth (102:1-2).",
        score: -4,
        tags: ["distraction", "worldliness"],
        nextId: "worldly-distraction", // New scenario about worldly distraction
      },
    ],
  },

  // New scenario - Worldly Distraction
  {
    id: "worldly-distraction",
    title: "The Pursuit of Wealth",
    description:
      "Months have passed, and you've focused intensely on your career and financial growth. Your investments have done well, and you've accumulated more wealth. However, you notice that your heart doesn't find the same joy in these successes as before. You recall the Prophet's warning: 'What I fear most for my ummah is the trial of wealth.' During a quiet moment, you wonder if your refusal to help your cousin was truly about principle or about attachment to wealth.",
    image: "/busy-office.png",
    choices: [
      {
        id: "worldly-distraction-1",
        text: "Recognize the spiritual emptiness and change course",
        outcome:
          "You recognize the spiritual emptiness that has grown despite your financial success. The Quran states: 'The mutual rivalry for piling up (worldly things) diverts you' (102:1). You decide it's time to rebalance your priorities.",
        score: 5,
        tags: ["awareness", "spiritual-growth"],
        nextId: "spiritual-awakening", // New scenario about spiritual awakening
      },
      {
        id: "worldly-distraction-2",
        text: "Donate a portion of your new wealth anonymously",
        outcome:
          "You decide to donate a significant portion of your new wealth to educational causes anonymously. Though not directly helping your cousin, you hope this act of charity will purify your wealth and heart, as the Prophet said: 'Purify your wealth through Zakat.'",
        score: 7,
        tags: ["generosity", "redemption"],
        nextId: "anonymous-giving", // Connect to existing anonymous giving scenario
      },
      {
        id: "worldly-distraction-3",
        text: "Continue focusing on wealth accumulation",
        outcome:
          "You decide that financial security is your priority and continue focusing on wealth accumulation. The whispers grow stronger: 'You've worked hard for this money, why give it away?' The Quran warns: 'Woe to every slanderer and backbiter who amasses wealth and counts it, thinking that his wealth would make him last forever' (104:1-3).",
        score: -6,
        tags: ["greed", "attachment"],
        nextId: "wealth-test", // New scenario about wealth as a test
      },
      {
        id: "worldly-distraction-4",
        text: "Seek knowledge about Islamic finance",
        outcome:
          "You decide to learn more about Islamic finance principles to better understand the balance between wealth accumulation and charity. This knowledge might help you make better decisions in the future.",
        score: 3,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // Connect to existing Islamic finance education scenario
      },
    ],
  },

  // New scenario - Wealth Test
  {
    id: "wealth-test",
    title: "Wealth as a Test",
    description:
      "Your wealth continues to grow, but you begin to experience unexpected challenges in other areas of life. You remember the Quranic teaching that wealth and children are a test (8:28). During a moment of reflection, you recall a hadith where the Prophet said: 'Every nation has a trial, and the trial of my nation is wealth.' You wonder if your increasing attachment to wealth is affecting your spiritual well-being and relationships.",
    image: "/reflection.png",
    choices: [
      {
        id: "wealth-test-1",
        text: "Acknowledge wealth as a test and seek balance",
        outcome:
          "You acknowledge that wealth is a test from Allah and seek to establish a better balance in your life. The Quran states: 'But seek, through that which Allah has given you, the home of the Hereafter, and [yet], do not forget your share of the world' (28:77).",
        score: 6,
        tags: ["balance", "wisdom", "spiritual-growth"],
        nextId: "spiritual-awakening", // Connect to spiritual awakening scenario
      },
      {
        id: "wealth-test-2",
        text: "Establish a systematic charity program",
        outcome:
          "You decide to establish a systematic program of regular charity, setting aside a fixed percentage of your income beyond the obligatory Zakat. The Prophet said: 'The believer's shade on the Day of Resurrection will be his charity.'",
        score: 8,
        tags: ["generosity", "systematic-giving", "spiritual-growth"],
        nextId: "charity-impact", // Connect to charity impact scenario
      },
      {
        id: "wealth-test-3",
        text: "Reconnect with your cousin and offer help",
        outcome:
          "After much reflection, you decide to reconnect with your cousin and offer help, acknowledging that your earlier refusal may have been influenced by attachment to wealth. This takes humility, which the Prophet described as 'lowering the wing of humility out of mercy.'",
        score: 7,
        tags: ["humility", "reconciliation", "generosity"],
        nextId: "reconciliation", // Connect to existing reconciliation scenario
      },
      {
        id: "wealth-test-4",
        text: "Reflect on the temporary nature of worldly possessions",
        outcome:
          "You spend time reflecting on the temporary nature of worldly possessions, as mentioned in the Quran: 'What is with you will perish, and what is with Allah will endure' (16:96). This reflection leads you to reconsider your priorities.",
        score: 5,
        tags: ["reflection", "detachment", "spiritual-growth"],
        nextId: "final-reflection", // Connect to final reflection scenario
      },
    ],
  },

  // New scenario - Spiritual Awakening
  {
    id: "spiritual-awakening",
    title: "Spiritual Awakening",
    description:
      "After a period of reflection, you experience a spiritual awakening regarding your relationship with wealth and charity. You recall the Quranic verse: 'Satan threatens you with poverty and orders you to immorality, while Allah promises you forgiveness from Him and bounty' (2:268). You realize how subtle Satan's whispers can be, using fear of poverty to prevent acts of generosity.",
    image: "/reflection.png",
    choices: [
      {
        id: "spiritual-awakening-1",
        text: "Implement regular charity in your financial planning",
        outcome:
          "You decide to implement regular charity as a non-negotiable part of your financial planning, recognizing that 'wealth does not decrease through charity' as the Prophet taught. This systematic approach helps you overcome the whispers of fear.",
        score: 9,
        tags: ["generosity", "systematic-giving", "spiritual-growth"],
        nextId: "charity-impact", // Connect to charity impact scenario
      },
      {
        id: "spiritual-awakening-2",
        text: "Share your spiritual journey with others",
        outcome:
          "You decide to share your spiritual journey with trusted friends and family, including your struggle with Satan's whispers regarding wealth and charity. This vulnerability helps others recognize similar patterns in their own lives.",
        score: 7,
        tags: ["knowledge-sharing", "community", "spiritual-growth"],
        nextId: "community-impact", // Connect to community impact scenario
      },
      {
        id: "spiritual-awakening-3",
        text: "Seek forgiveness and make amends",
        outcome:
          "You seek Allah's forgiveness for your attachment to wealth and decide to make amends with your cousin. The Prophet said: 'The one who severs ties of kinship will not enter Paradise.' This decision brings peace to your heart.",
        score: 8,
        tags: ["repentance", "reconciliation", "spiritual-growth"],
        nextId: "reconciliation", // Connect to reconciliation scenario
      },
      {
        id: "spiritual-awakening-4",
        text: "Deepen your knowledge of spiritual purification",
        outcome:
          "You decide to deepen your knowledge about spiritual purification (Tazkiyah) in Islam, particularly regarding attachment to wealth. This knowledge helps you recognize and counter Satan's whispers more effectively.",
        score: 6,
        tags: ["knowledge", "spiritual-growth", "wisdom"],
        nextId: "final-reflection", // Connect to final reflection scenario
      },
    ],
  },

  // New scenario - Delayed Charity
  {
    id: "delayed-charity",
    title: "Delayed Charity",
    description:
      "You've decided to help your cousin after initially refusing. As you prepare to reach out, you notice hesitation arising within you. The Prophet Muhammad said: 'Hasten to give charity, for calamity cannot precede it.' You recognize that Satan often tries to delay good deeds, hoping they'll be forgotten entirely.",
    image: "/charity-impact.png",
    choices: [
      {
        id: "delayed-charity-1",
        text: "Act immediately despite the hesitation",
        outcome:
          "You push through the hesitation and act immediately, remembering the hadith: 'The best charity is that given when one is in need and struggling.' Your decisive action breaks the pattern of delay that Satan encourages.",
        score: 8,
        tags: ["decisiveness", "generosity", "spiritual-strength"],
        nextId: "charity-impact", // Connect to charity impact scenario
      },
      {
        id: "delayed-charity-2",
        text: "Start small but commit to consistent help",
        outcome:
          "Rather than a large one-time contribution, you decide to start small but commit to consistent help over time. The Prophet said: 'The most beloved of deeds to Allah are those that are consistent, even if they are small.'",
        score: 7,
        tags: ["consistency", "generosity", "wisdom"],
        nextId: "education-outcomes", // Connect to education outcomes scenario
      },
      {
        id: "delayed-charity-3",
        text: "Involve others in a collective effort",
        outcome:
          "You decide to involve other family members in a collective effort to help your cousin, spreading both the responsibility and the reward. The Quran encourages cooperation in righteousness and piety (5:2).",
        score: 9,
        tags: ["community", "leadership", "generosity"],
        nextId: "takaful-system", // Connect to takaful system scenario
      },
      {
        id: "delayed-charity-4",
        text: "Reflect on what caused your initial refusal",
        outcome:
          "You take time to reflect deeply on what caused your initial refusal and subsequent delay, gaining valuable insights about your relationship with wealth and the subtle ways Satan influences decisions.",
        score: 6,
        tags: ["self-awareness", "reflection", "spiritual-growth"],
        nextId: "final-reflection", // Connect to final reflection scenario
      },
    ],
  },

  // Add a new scenario for reconciliation
  {
    id: "reconciliation",
    title: "Reconciliation and Healing",
    description:
      "You reach out to your cousin to reconcile and offer help after your previous refusal. The initial conversation is awkward, but you persist with humility. The Prophet Muhammad emphasized the importance of maintaining family ties, saying that Allah will not look at the person who severs the ties of kinship on the Day of Judgment.",
    image: "/family-gathering.png",
    choices: [
      {
        id: "reconciliation-1",
        text: "Offer financial help without conditions",
        outcome:
          "You offer financial help without conditions, acknowledging that your previous refusal may have caused hardship. Your cousin is moved by your sincerity and the relationship begins to heal.",
        score: 8,
        tags: ["generosity", "reconciliation", "humility"],
        nextId: "education-outcomes", // Connect to education outcomes scenario
      },
      {
        id: "reconciliation-2",
        text: "Propose a structured support plan",
        outcome:
          "You propose a structured support plan that provides sustainable help while respecting your cousin's dignity. This thoughtful approach demonstrates both compassion and wisdom.",
        score: 9,
        tags: ["wisdom", "compassion", "systematic-giving"],
        nextId: "islamic-business-partnership", // Connect to Islamic business partnership scenario
      },
      {
        id: "reconciliation-3",
        text: "Share your spiritual journey and lessons learned",
        outcome:
          "You share your spiritual journey and the lessons you've learned about Satan's whispers regarding wealth and charity. This vulnerability strengthens your family bond and provides valuable insights for your cousin as well.",
        score: 7,
        tags: ["knowledge-sharing", "spiritual-growth", "reconciliation"],
        nextId: "community-impact", // Connect to community impact scenario
      },
      {
        id: "reconciliation-4",
        text: "Focus on rebuilding trust through consistent actions",
        outcome:
          "You focus on rebuilding trust through consistent small actions rather than grand gestures, recognizing that reconciliation is a process. The Prophet said: 'The most beloved of deeds to Allah are those that are consistent, even if they are small.'",
        score: 6,
        tags: ["consistency", "trust-building", "wisdom"],
        nextId: "final-reflection", // Connect to final reflection scenario
      },
    ],
  },

  // Second level scenarios - each following from a choice in the first scenario

  // Scenario following "Give the loan with clear terms"
  {
    id: "loan-terms",
    title: "Formalizing the Loan",
    description:
      "Having decided to give your cousin a loan, you now need to determine how to formalize the agreement according to Islamic principles. The Prophet Muhammad (peace be upon him) emphasized the importance of clear documentation in financial transactions.",
    image: "/loan-agreement.png",
    choices: [
      {
        id: "loan-terms-1",
        text: "Write a strict document with clear repayment terms (Kitabah)",
        outcome:
          "You create a formal document (Kitabah) with strict repayment terms and deadlines, following the Quranic guidance on documenting loans. Your cousin agrees but seems uncomfortable with the formality.",
        score: 3,
        tags: ["justice"],
        nextId: "loan-repayment", // MERGING: This leads to a shared third-level scenario
      },
      {
        id: "loan-terms-2",
        text: "Offer a loan with hidden benefits (Riba al-Fadl)",
        outcome:
          "You structure the loan to include additional benefits for yourself, effectively charging interest in a disguised form. This is known as Riba al-Fadl, which is prohibited in Islam as it circumvents the prohibition on interest.",
        score: -5,
        tags: ["injustice"],
        nextId: "prohibited-transaction", // This leads to a scenario about prohibited transactions
      },
      {
        id: "loan-terms-3",
        text: "Give Qard Hasan (interest-free loan) without documentation",
        outcome:
          "You give an interest-free loan (Qard Hasan) along with some additional charity, without formal documentation. You verbally tell your cousin he need not return the money if he truly cannot afford to.",
        score: 6,
        tags: ["generosity", "compassion"],
        nextId: "loan-repayment", // MERGING: Same third-level scenario
      },
      {
        id: "loan-terms-4",
        text: "Offer Qard Hasan with proper documentation",
        outcome:
          "You offer a Qard Hasan (goodly loan), which is an interest-free loan encouraged in Islamic teachings. You document it properly following the guidance in Surah Al-Baqarah (2:282) about writing down debts, but include provisions for extending the term or forgiving the debt in case of genuine hardship.",
        score: 8,
        tags: ["generosity", "justice", "wisdom"],
        nextId: "loan-repayment", // MERGING: Same third-level scenario
      },
    ],
  },

  // Scenario following "Give charity instead"
  {
    id: "after-charity",
    title: "The Impact of Sadaqah",
    description:
      "A month has passed since you gave Sadaqah (voluntary charity) to your cousin instead of a loan. You learn that while the money helped, it wasn't enough to cover all the educational expenses. Your cousin has been telling family members that he feels humiliated by accepting charity rather than a loan.",
    image: "/charity-impact.png",
    choices: [
      {
        id: "after-charity-1",
        text: "Explain the virtue of Sadaqah in Islam",
        outcome:
          "You explain to your cousin the virtue of both giving and accepting Sadaqah in Islam, citing hadith about how the Prophet Muhammad encouraged charity and how it does not diminish wealth.",
        score: 6,
        tags: ["knowledge", "wisdom"],
        nextId: "family-relations", // MERGING: Same third-level scenario as from after-refusal
      },
      {
        id: "after-charity-2",
        text: "Offer additional Sadaqah anonymously",
        outcome:
          "You arrange for additional funds to be provided anonymously through a third party, practicing the highest form of Sadaqah as described by Maimonides, preserving your cousin's dignity while ensuring the children's education is covered.",
        score: 7,
        tags: ["generosity", "compassion", "wisdom"],
        nextId: "anonymous-giving", // Unique third-level scenario
      },
      {
        id: "after-charity-3",
        text: "Suggest Waqf for education",
        outcome:
          "You introduce the concept of Waqf (Islamic endowment) for education, suggesting that a small endowment could be established to support his children's education in a sustainable way.",
        score: 8,
        tags: ["knowledge", "wisdom", "generosity"],
        nextId: "waqf-establishment", // NEW SCENARIO: This leads to a scenario about establishing a Waqf
      },
      {
        id: "after-charity-4",
        text: "Organize a family Takaful for education",
        outcome:
          "You propose creating a family Takaful (mutual guarantee) system for education where multiple family members contribute to help with educational expenses for any family member in need, based on the Islamic principle of mutual cooperation.",
        score: 9,
        tags: ["wisdom", "community", "leadership"],
        nextId: "takaful-system", // NEW SCENARIO: This leads to a scenario about Takaful
      },
    ],
  },

  // Scenario following "Offer to pay the school directly"
  {
    id: "after-direct-payment",
    title: "School Payment Arrangements",
    description:
      "You've contacted the school to arrange direct payment for your cousin's children's education. The school administrator mentions that your cousin has outstanding debts to the school beyond just the tuition fees, including unpaid lunch programs and activity fees.",
    image: "/school-payment.png",
    choices: [
      {
        id: "after-direct-payment-1",
        text: "Pay only the tuition as originally discussed",
        outcome:
          "You stick to your original offer and pay only the tuition fees, leaving your cousin to handle the other outstanding debts. This follows the Islamic principle of fulfilling promises as they were made.",
        score: 3,
        tags: ["boundaries", "honesty"],
        nextId: "education-outcomes", // This leads to a unique third-level scenario
      },
      {
        id: "after-direct-payment-2",
        text: "Cover all debts as Sadaqah Jariyah",
        outcome:
          "You decide to cover all the outstanding debts as Sadaqah Jariyah (continuous charity), recognizing that education is one of the three things that continue to benefit a person even after death according to hadith.",
        score: 6,
        tags: ["generosity", "compassion"],
        nextId: "education-outcomes", // MERGING: Same third-level scenario
      },
      {
        id: "after-direct-payment-3",
        text: "Establish a Mudarabah agreement for future expenses",
        outcome:
          "You propose a Mudarabah (profit-sharing) agreement where you provide capital for a small business idea your cousin has, with the profits directed toward the children's education. This teaches him to fish rather than giving him a fish.",
        score: 8,
        tags: ["wisdom", "knowledge"],
        nextId: "islamic-business-partnership", // NEW SCENARIO: This leads to a scenario about Islamic business partnerships
      },
      {
        id: "after-direct-payment-4",
        text: "Set up a Musharakah for educational expenses",
        outcome:
          "You suggest a Musharakah (partnership) arrangement where you and your cousin jointly contribute to the educational expenses, with you covering the majority now but gradually decreasing your share as his financial situation improves.",
        score: 7,
        tags: ["wisdom", "justice", "compassion"],
        nextId: "islamic-business-partnership", // MERGING: Same as above
      },
    ],
  },

  // NEW SCENARIO: Prohibited Transaction
  {
    id: "prohibited-transaction",
    title: "Consequences of Riba",
    description:
      "You've structured the loan with hidden benefits for yourself, effectively engaging in Riba al-Fadl (disguised interest). As time passes, you begin to feel uneasy about this arrangement, remembering the strong Quranic prohibitions against Riba (interest) and the hadith stating that the sin of knowingly dealing in Riba is equivalent to committing adultery multiple times.",
    image: "/prohibited-transaction.png",
    choices: [
      {
        id: "prohibited-transaction-1",
        text: "Continue with the arrangement",
        outcome:
          "You decide to continue with the arrangement despite your unease, prioritizing financial gain over Islamic principles. This creates spiritual discomfort and strains your relationship with your cousin.",
        score: -8,
        tags: ["injustice"],
        nextId: "spiritual-consequences", // NEW SCENARIO: This leads to a scenario about spiritual consequences
      },
      {
        id: "prohibited-transaction-2",
        text: "Rectify the agreement to remove Riba elements",
        outcome:
          "Recognizing the error, you modify the agreement to remove all elements of Riba, converting it to a proper Qard Hasan (interest-free loan) in accordance with Islamic principles.",
        score: 5,
        tags: ["repentance", "justice"],
        nextId: "loan-repayment", // MERGING: This connects to the loan repayment scenario
      },
      {
        id: "prohibited-transaction-3",
        text: "Seek knowledge about Islamic finance",
        outcome:
          "You decide to educate yourself more thoroughly about Islamic finance principles, seeking knowledge from scholars and reliable sources to ensure you don't make similar mistakes in the future.",
        score: 6,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // NEW SCENARIO: This leads to a scenario about Islamic finance education
      },
      {
        id: "prohibited-transaction-4",
        text: "Convert the loan to charity and seek forgiveness",
        outcome:
          "You decide to convert the entire loan to charity (Sadaqah), forgiving any repayment, and seek Allah's forgiveness for engaging in a prohibited transaction, following the Islamic principle of repentance.",
        score: 7,
        tags: ["repentance", "generosity"],
        nextId: "after-charity", // CIRCULAR PATH: This connects back to the charity scenario
      },
    ],
  },

  // NEW SCENARIO: Islamic Microfinance
  {
    id: "islamic-microfinance",
    title: "Islamic Microfinance Options",
    description:
      "You've researched Islamic microfinance options that might help your cousin. These include Qard Hasan programs, Murabaha microfinance (cost-plus financing), and Musharakah-based microfinance (partnership financing). Each follows Sharia principles while providing needed funds for small-scale needs.",
    image: "/islamic-microfinance.png",
    choices: [
      {
        id: "islamic-microfinance-1",
        text: "Connect him with a Qard Hasan program",
        outcome:
          "You help your cousin apply to a Qard Hasan program offered by a local Islamic organization, which provides interest-free loans to those in need, following the Quranic encouragement of this practice.",
        score: 7,
        tags: ["knowledge", "compassion"],
        nextId: "loan-repayment", // MERGING: This connects to the loan repayment scenario
      },
      {
        id: "islamic-microfinance-2",
        text: "Suggest Murabaha microfinancing",
        outcome:
          "You introduce your cousin to Murabaha microfinancing, where the institution buys educational services directly and sells them to him at a marked-up price with installment payments, avoiding interest while providing needed financing.",
        score: 6,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // MERGING: This connects to Islamic finance education
      },
      {
        id: "islamic-microfinance-3",
        text: "Explore Musharakah microfinance options",
        outcome:
          "You research Musharakah-based microfinance, where the financial institution becomes a partner in a small business venture with your cousin, sharing profits and losses according to Islamic principles.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-business-partnership", // MERGING: This connects to Islamic business partnership
      },
      {
        id: "islamic-microfinance-4",
        text: "Help establish a community-based Takaful",
        outcome:
          "You work with community members to establish a small-scale Takaful (mutual guarantee) fund that can provide emergency financing for education and other essential needs based on mutual cooperation.",
        score: 8,
        tags: ["leadership", "community", "knowledge"],
        nextId: "takaful-system", // MERGING: This connects to the Takaful system scenario
      },
    ],
  },

  // This is both a second-level and third-level scenario (can be reached from multiple paths)
  {
    id: "community-resources",
    title: "Islamic Community Support Systems",
    description:
      "You've decided to explore Islamic community resources that could help your cousin's situation. These include Baitul Mal (community treasury), Zakat funds (obligatory charity), Waqf institutions (endowments), and various Islamic charitable organizations that operate according to Sharia principles.",
    image: "/community-support.png",
    choices: [
      {
        id: "community-resources-1",
        text: "Connect with Baitul Mal resources",
        outcome:
          "You help your cousin apply for educational assistance from the local Baitul Mal (community treasury), an institution with roots in early Islamic history that provides support to those in need within the community.",
        score: 7,
        tags: ["knowledge", "community"],
        nextId: "education-outcomes", // MERGING: This connects to education outcomes
      },
      {
        id: "community-resources-2",
        text: "Apply for Zakat-based educational support",
        outcome:
          "You discover that your cousin qualifies as a recipient of Zakat (obligatory charity) under the category of the needy (Fuqara) or poor (Masakeen). You help him apply for educational support from Zakat funds.",
        score: 8,
        tags: ["knowledge", "compassion"],
        nextId: "education-outcomes", // MERGING: Shared with other education-related paths
      },
      {
        id: "community-resources-3",
        text: "Explore existing educational Waqf programs",
        outcome:
          "You research educational Waqf (endowment) programs in your community that provide scholarships and financial assistance, connecting your cousin with these sustainable charitable institutions.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "waqf-establishment", // MERGING: This connects to the Waqf establishment scenario
      },
      {
        id: "community-resources-4",
        text: "Suggest joining a Takaful program",
        outcome:
          "You find a community Takaful program that functions as a mutual aid society where members contribute regularly and can receive support for educational and other essential needs when required.",
        score: 6,
        tags: ["knowledge", "community"],
        nextId: "takaful-system", // MERGING: This connects to the Takaful system scenario
      },
    ],
  },

  // Third level scenarios (some shared across multiple paths)

  // Shared third-level scenario for loan repayment situations
  {
    id: "loan-repayment",
    title: "The Repayment Period",
    description:
      "Six months have passed since you formalized the loan agreement with your cousin. The repayment period has begun, and you're now facing the practical implications of your decision. Islamic principles emphasize both the obligation of repaying debts and showing leniency to those in genuine difficulty.",
    image: "/loan-repayment.png",
    choices: [
      {
        id: "loan-repayment-1",
        text: "Strictly enforce the repayment schedule",
        outcome:
          "You adhere strictly to the agreed repayment schedule, sending reminders when payments are due. While this is within your rights, the Prophet Muhammad encouraged leniency with debtors who are making an honest effort.",
        score: 3,
        tags: ["justice"],
        nextId: "repayment-challenges", // This leads to a scenario about repayment challenges
      },
      {
        id: "loan-repayment-2",
        text: "Offer flexibility (Samaha) with payment dates",
        outcome:
          "You show flexibility (Samaha) with payment dates when your cousin faces difficulties, following the Prophetic teaching: 'May Allah have mercy on the one who is lenient when he buys, when he sells, and when he asks for repayment.'",
        score: 7,
        tags: ["compassion", "wisdom"],
        nextId: "family-relations", // This connects to family relations
      },
      {
        id: "loan-repayment-3",
        text: "Implement Ibra' (partial loan forgiveness)",
        outcome:
          "Seeing your cousin's continued financial struggles, you decide to implement Ibra' (partial loan forgiveness), reducing his burden while maintaining the expectation that the remainder will be repaid.",
        score: 8,
        tags: ["generosity", "compassion"],
        nextId: "after-charity", // CIRCULAR PATH: This connects back to the charity scenario
      },
      {
        id: "loan-repayment-4",
        text: "Suggest alternative Islamic financing solutions",
        outcome:
          "When your cousin struggles with repayment, you suggest alternative Islamic financing solutions that might better suit his current situation, such as restructuring the debt or connecting with community resources.",
        score: 6,
        tags: ["wisdom", "knowledge"],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
    ],
  },

  // NEW SCENARIO: Waqf Establishment
  {
    id: "waqf-establishment",
    title: "Establishing an Educational Waqf",
    description:
      "You're exploring the establishment of a Waqf (Islamic endowment) for education. Waqf is a perpetual charitable endowment in Islamic law where a property or asset is dedicated to Allah, with its benefits used for specified charitable purposes. The Prophet Muhammad encouraged this form of sustainable charity.",
    image: "/waqf-establishment.png",
    choices: [
      {
        id: "waqf-establishment-1",
        text: "Establish a small family educational Waqf",
        outcome:
          "You establish a small family educational Waqf with your own funds, creating a sustainable source of support for your cousin's children and potentially other family members in the future.",
        score: 9,
        tags: ["generosity", "wisdom", "legacy"],
        nextId: "education-outcomes", // This connects to education outcomes
      },
      {
        id: "waqf-establishment-2",
        text: "Contribute to an existing educational Waqf",
        outcome:
          "Rather than creating a new Waqf, you contribute to an established educational Waqf institution that has a proven track record of supporting students in need.",
        score: 7,
        tags: ["generosity", "wisdom"],
        nextId: "education-outcomes", // This connects to education outcomes
      },
      {
        id: "waqf-establishment-3",
        text: "Organize a collective family Waqf",
        outcome:
          "You organize multiple family members to contribute to a collective Waqf for education, creating a larger and more sustainable endowment through pooled resources.",
        score: 8,
        tags: ["leadership", "community", "generosity"],
        nextId: "takaful-system", // This connects to the Takaful system
      },
      {
        id: "waqf-establishment-4",
        text: "Create a Waqf with knowledge resources",
        outcome:
          "You establish a Waqf that provides not just financial support but also knowledge resources, tutoring, and mentorship, following the Islamic tradition of sharing knowledge as a form of charity.",
        score: 8,
        tags: ["knowledge", "wisdom", "generosity"],
        nextId: "education-outcomes", // This connects to education outcomes
      },
    ],
  },

  // NEW SCENARIO: Takaful System
  {
    id: "takaful-system",
    title: "Implementing a Family Takaful System",
    description:
      "You're working to implement a Takaful (mutual guarantee) system within your family. Takaful is based on the Islamic principles of Ta'awun (mutual cooperation) and Tabarru (donation), where participants contribute to a pool that helps members in times of need, avoiding the prohibited elements of conventional insurance.",
    image: "/takaful-system.png",
    choices: [
      {
        id: "takaful-system-1",
        text: "Establish a family education Takaful fund",
        outcome:
          "You establish a structured family Takaful specifically for educational expenses, where family members contribute regularly to a fund that can be used by any member for educational needs.",
        score: 9,
        tags: ["leadership", "community", "wisdom"],
        nextId: "education-outcomes", // This connects to education outcomes
      },
      {
        id: "takaful-system-2",
        text: "Connect with a professional Takaful operator",
        outcome:
          "You research and connect with a professional Takaful operator that offers education plans, providing a more formalized and potentially broader protection system based on Islamic principles.",
        score: 6,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
      {
        id: "takaful-system-3",
        text: "Create a comprehensive family welfare Takaful",
        outcome:
          "You expand the concept beyond education to create a comprehensive family welfare Takaful that can address various needs including education, medical expenses, and other emergencies.",
        score: 8,
        tags: ["leadership", "wisdom", "community"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "takaful-system-4",
        text: "Implement a rotating Qard fund alongside Takaful",
        outcome:
          "You implement a hybrid system that combines Takaful principles with a rotating Qard Hasan (interest-free loan) fund, providing both emergency assistance and structured financing options for family members.",
        score: 7,
        tags: ["innovation", "wisdom", "knowledge"],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
    ],
  },

  // NEW SCENARIO: Islamic Business Partnership
  {
    id: "islamic-business-partnership",
    title: "Islamic Business Partnership Models",
    description:
      "You're exploring Islamic business partnership models to help your cousin generate income while adhering to Sharia principles. These include Mudarabah (profit-sharing), Musharakah (partnership), and Ijarah (leasing) arrangements that avoid interest and excessive uncertainty (Gharar).",
    image: "/islamic-business-partnership.png",
    choices: [
      {
        id: "islamic-business-partnership-1",
        text: "Establish a Mudarabah agreement",
        outcome:
          "You establish a Mudarabah (profit-sharing) agreement where you provide capital and your cousin contributes labor/management, with profits shared according to a pre-agreed ratio and losses borne by the capital provider (you).",
        score: 7,
        tags: ["knowledge", "generosity"],
        nextId: "business-outcomes", // NEW SCENARIO: This leads to a scenario about business outcomes
      },
      {
        id: "islamic-business-partnership-2",
        text: "Form a Musharakah partnership",
        outcome:
          "You form a Musharakah (partnership) where both you and your cousin contribute capital to a business venture, sharing profits according to a pre-agreed ratio and losses according to capital contribution.",
        score: 6,
        tags: ["knowledge", "justice"],
        nextId: "business-outcomes", // MERGING: Same as above
      },
      {
        id: "islamic-business-partnership-3",
        text: "Arrange an Ijarah (leasing) agreement",
        outcome:
          "You purchase equipment or assets that your cousin needs for a business and lease them to him through an Ijarah arrangement, providing him with the means to generate income without interest-based financing.",
        score: 5,
        tags: ["knowledge", "wisdom"],
        nextId: "business-outcomes", // MERGING: Same as above
      },
      {
        id: "islamic-business-partnership-4",
        text: "Connect him with Islamic microfinance institutions",
        outcome:
          "Rather than forming a direct partnership, you connect your cousin with Islamic microfinance institutions that offer Sharia-compliant business financing options.",
        score: 4,
        tags: ["knowledge", "community"],
        nextId: "islamic-microfinance", // CIRCULAR PATH: This connects back to Islamic microfinance
      },
    ],
  },

  // NEW SCENARIO: Business Outcomes
  {
    id: "business-outcomes",
    title: "Business Partnership Results",
    description:
      "A year has passed since you established an Islamic business partnership with your cousin. The business has faced both successes and challenges, and now you need to evaluate the arrangement and decide how to proceed.",
    image: "/business-outcomes.png",
    choices: [
      {
        id: "business-outcomes-1",
        text: "Continue the partnership with adjustments",
        outcome:
          "You decide to continue the partnership but make adjustments based on lessons learned, refining the agreement to better address challenges while maintaining Sharia compliance.",
        score: 6,
        tags: ["wisdom", "perseverance"],
        nextId: "family-relations", // This connects to family relations
      },
      {
        id: "business-outcomes-2",
        text: "Gradually transfer ownership to your cousin",
        outcome:
          "Seeing your cousin's growing business acumen, you implement a plan to gradually transfer more ownership to him, creating a path to full independence while maintaining Sharia compliance.",
        score: 8,
        tags: ["wisdom", "generosity"],
        nextId: "education-outcomes", // This connects to education outcomes
      },
      {
        id: "business-outcomes-3",
        text: "Expand the business with additional partners",
        outcome:
          "You decide to expand the business by bringing in additional family members or community partners, creating a larger Sharia-compliant enterprise with greater potential impact.",
        score: 7,
        tags: ["leadership", "community"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "business-outcomes-4",
        text: "Convert the business to a social enterprise",
        outcome:
          "You transform the business into a social enterprise that not only generates income but also explicitly serves community needs, aligning with Islamic principles of social responsibility.",
        score: 9,
        tags: ["innovation", "community", "compassion"],
        nextId: "community-impact", // MERGING: Same as above
      },
    ],
  },

  // NEW SCENARIO: Islamic Finance Education
  {
    id: "islamic-finance-education",
    title: "Learning Islamic Finance Principles",
    description:
      "You've decided to deepen your understanding of Islamic finance principles to make better financial decisions according to Sharia. Islamic finance is based on core principles including the prohibition of Riba (interest), Gharar (excessive uncertainty), and Maysir (gambling), while encouraging ethical, asset-backed transactions.",
    image: "/islamic-finance-education.png",
    choices: [
      {
        id: "islamic-finance-education-1",
        text: "Study the Fiqh of financial transactions",
        outcome:
          "You dedicate time to studying the Fiqh (Islamic jurisprudence) of financial transactions, learning about the detailed rulings on various types of contracts and arrangements in Islamic law.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "knowledge-application", // NEW SCENARIO: This leads to a scenario about applying knowledge
      },
      {
        id: "islamic-finance-education-2",
        text: "Attend workshops on Islamic finance",
        outcome:
          "You attend workshops and seminars on Islamic finance, learning practical applications of Sharia principles in modern financial contexts from experts in the field.",
        score: 6,
        tags: ["knowledge", "community"],
        nextId: "knowledge-application", // MERGING: Same as above
      },
      {
        id: "islamic-finance-education-3",
        text: "Organize a study circle on Islamic economics",
        outcome:
          "You organize a study circle focused on Islamic economics and finance, creating a community of learners who can explore these concepts together and support each other in implementation.",
        score: 8,
        tags: ["knowledge", "leadership", "community"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "islamic-finance-education-4",
        text: "Consult with scholars about specific financial questions",
        outcome:
          "You consult with knowledgeable scholars about specific financial questions relevant to your situation, seeking personalized guidance on applying Islamic principles.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "knowledge-application", // MERGING: Same as above
      },
    ],
  },

  // NEW SCENARIO: Knowledge Application
  {
    id: "knowledge-application",
    title: "Applying Islamic Financial Knowledge",
    description:
      "Having gained deeper knowledge of Islamic finance principles, you're now in a position to apply this knowledge in practical ways, both in your own financial decisions and in helping others navigate financial matters according to Sharia.",
    image: "/knowledge-application.png",
    choices: [
      {
        id: "knowledge-application-1",
        text: "Restructure your personal finances according to Sharia",
        outcome:
          "You review and restructure your own financial arrangements to ensure they're fully Sharia-compliant, moving away from conventional banking and investment products toward Islamic alternatives.",
        score: 7,
        tags: ["implementation", "integrity"],
        nextId: "family-request", // CIRCULAR PATH: This loops back to the beginning with new context
      },
      {
        id: "knowledge-application-2",
        text: "Provide guidance to family members",
        outcome:
          "You share your knowledge with family members, helping them understand Islamic finance principles and make more Sharia-compliant financial decisions.",
        score: 6,
        tags: ["knowledge", "family"],
        nextId: "family-relations", // This connects to family relations
      },
      {
        id: "knowledge-application-3",
        text: "Develop educational resources on Islamic finance",
        outcome:
          "You develop simple educational resources on Islamic finance that can be shared with your community, making this knowledge more accessible to others.",
        score: 8,
        tags: ["knowledge", "community", "generosity"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "knowledge-application-4",
        text: "Advocate for more Islamic finance options locally",
        outcome:
          "You advocate for more Islamic finance options in your local community, engaging with financial institutions and community organizations to increase access to Sharia-compliant financial services.",
        score: 9,
        tags: ["leadership", "community", "knowledge"],
        nextId: "community-impact", // MERGING: Same as above
      },
    ],
  },

  // Shared third-level scenario for family relations
  {
    id: "family-relations",
    title: "Family Dynamics and Financial Ethics",
    description:
      "Your decisions regarding your cousin's situation have influenced family dynamics and raised questions about financial ethics within an Islamic framework. At a family gathering for Eid, the topic of financial assistance among relatives becomes a point of discussion.",
    image: "/family-gathering.png",
    choices: [
      {
        id: "family-relations-1",
        text: "Share Islamic principles about financial relationships",
        outcome:
          "You respectfully share Islamic teachings about financial relationships between family members, citing relevant Quranic verses and hadith about generosity, justice, and responsibility.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
      {
        id: "family-relations-2",
        text: "Listen to different perspectives with Adab (proper etiquette)",
        outcome:
          "You practice good Adab (Islamic etiquette) by listening carefully to different perspectives without imposing your views, gaining insights into how others in your family approach these complex situations.",
        score: 5,
        tags: ["wisdom", "patience"],
        nextId: "family-request", // CIRCULAR PATH: This loops back to the beginning with new context
      },
      {
        id: "family-relations-3",
        text: "Propose a family financial support system based on Islamic principles",
        outcome:
          "Inspired by the discussion, you propose creating a structured family support system based on Islamic principles of mutual aid, incorporating concepts like Takaful and Qard Hasan.",
        score: 8,
        tags: ["leadership", "community", "wisdom"],
        nextId: "takaful-system", // This connects to the Takaful system
      },
      {
        id: "family-relations-4",
        text: "Emphasize the importance of financial independence and responsibility",
        outcome:
          "You emphasize the Islamic values of self-sufficiency and financial responsibility, while acknowledging the importance of supporting those in genuine need, creating a balanced perspective.",
        score: 6,
        tags: ["wisdom", "balance"],
        nextId: "knowledge-application", // This connects to knowledge application
      },
    ],
  },

  // Unique third-level scenario for anonymous giving
  {
    id: "anonymous-giving",
    title: "The Virtue of Anonymous Sadaqah",
    description:
      "You've arranged for anonymous charity to help with your cousin's children's education. The funds have been provided through a third party, and your cousin doesn't know you're the source. The Prophet Muhammad taught that among the seven people Allah will shade on the Day of Judgment is 'a person who gives charity and conceals it, such that his left hand does not know what his right hand gives.'",
    image: "/anonymous-charity.png",
    choices: [
      {
        id: "anonymous-giving-1",
        text: "Maintain your anonymity as taught in hadith",
        outcome:
          "You decide to keep your role as the donor permanently anonymous, embodying the Islamic teaching that the best charity is that which is given secretly, protecting you from pride and the recipient from feeling indebted.",
        score: 9,
        tags: ["sincerity", "generosity"],
        nextId: "charity-impact", // This leads to a scenario about charity impact
      },
      {
        id: "anonymous-giving-2",
        text: "Reveal yourself to strengthen family bonds",
        outcome:
          "After some time, you decide to reveal that you were the anonymous donor, hoping to repair any strain in your relationship, though this may diminish some of the spiritual reward of anonymous giving.",
        score: 4,
        tags: ["family", "honesty"],
        nextId: "family-relations", // This connects to family relations
      },
      {
        id: "anonymous-giving-3",
        text: "Encourage Sadaqah culture in your community",
        outcome:
          "Without revealing your own contribution, you encourage a culture of giving Sadaqah in your community, emphasizing both the spiritual rewards and practical benefits of charitable giving in Islam.",
        score: 8,
        tags: ["leadership", "community", "knowledge"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "anonymous-giving-4",
        text: "Establish a sustainable Sadaqah Jariyah",
        outcome:
          "You arrange for ongoing anonymous Sadaqah Jariyah (continuous charity) that will provide sustainable support for education, following the hadith that when a person dies, their deeds end except for three, including ongoing charity.",
        score: 10,
        tags: ["generosity", "wisdom", "legacy"],
        nextId: "waqf-establishment", // This connects to Waqf establishment
      },
    ],
  },

  // NEW SCENARIO: Charity Impact
  {
    id: "charity-impact",
    title: "The Impact of Your Charity",
    description:
      "You've been giving charity anonymously for some time now. You begin to see the positive effects of your contributions on the community, particularly in educational opportunities for children. The Prophet Muhammad said, 'Charity does not decrease wealth,' highlighting the spiritual and material blessings that come from giving.",
    image: "/charity-impact.png",
    choices: [
      {
        id: "charity-impact-1",
        text: "Continue giving anonymously",
        outcome:
          "You decide to maintain your anonymous giving, embodying the highest level of charity as described in Islamic teachings, where the right hand doesn't know what the left hand gives.",
        score: 8,
        tags: ["generosity", "sincerity"],
        nextId: "charity-impact-long-term",
      },
      {
        id: "charity-impact-2",
        text: "Encourage others to give by sharing your experience",
        outcome:
          "While maintaining your own anonymity, you share the positive impacts of charity with others, encouraging them to give as well, multiplying the benefit to the community.",
        score: 7,
        tags: ["leadership", "community"],
        nextId: "community-impact",
      },
      {
        id: "charity-impact-3",
        text: "Establish a more structured charitable initiative",
        outcome:
          "You decide to formalize your charitable giving by establishing a structured initiative that can have a more systematic impact on education in your community.",
        score: 9,
        tags: ["leadership", "wisdom", "community"],
        nextId: "waqf-establishment",
      },
      {
        id: "charity-impact-4",
        text: "Focus on sustainable development projects",
        outcome:
          "You shift your charitable focus to sustainable development projects that can create lasting change, following the Islamic principle that teaching someone to fish is better than giving them a fish.",
        score: 8,
        tags: ["wisdom", "foresight"],
        nextId: "community-impact",
      },
    ],
  },

  // Shared third-level scenario for education outcomes
  {
    id: "education-outcomes",
    title: "Educational Progress and Impact",
    description:
      "A year has passed, and you see the impact of your decision on your cousin's children's education. They have been able to continue their studies, and their academic performance has improved. The Prophet Muhammad emphasized the importance of seeking knowledge, saying it is obligatory upon every Muslim.",
    image: "/education-outcomes.png",
    choices: [
      {
        id: "education-outcomes-1",
        text: "Offer mentorship based on Islamic values",
        outcome:
          "Beyond financial support, you decide to offer mentorship to the children, helping them with their studies and providing guidance about Islamic values and character development alongside academic knowledge.",
        score: 9,
        tags: ["knowledge", "wisdom", "compassion"],
        nextId: "mentorship", // This leads to a scenario about mentorship
      },
      {
        id: "education-outcomes-2",
        text: "Emphasize the Islamic concept of seeking knowledge",
        outcome:
          "You have conversations with your cousin and his children about the importance of seeking knowledge in Islam, citing the many hadith that elevate the status of those who pursue education.",
        score: 7,
        tags: ["knowledge", "wisdom"],
        nextId: "family-relations", // This connects to family relations
      },
      {
        id: "education-outcomes-3",
        text: "Connect the family with Islamic educational resources",
        outcome:
          "You research and share additional Islamic educational resources, scholarships, and programs that could benefit the children in developing both secular knowledge and Islamic understanding.",
        score: 8,
        tags: ["knowledge", "generosity"],
        nextId: "community-resources", // This connects back to community resources
      },
      {
        id: "education-outcomes-4",
        text: "Reflect on education as a form of Sadaqah Jariyah",
        outcome:
          "You reflect on how supporting education is a form of Sadaqah Jariyah (continuous charity), as the Prophet Muhammad said that among the deeds that continue to benefit a person after death is beneficial knowledge they have shared.",
        score: 6,
        tags: ["wisdom", "reflection"],
        nextId: "final-reflection", // This leads to the final reflection
      },
    ],
  },

  // NEW SCENARIO: Mentorship
  {
    id: "mentorship",
    title: "Islamic Mentorship and Guidance",
    description:
      "You've taken on a mentorship role with your cousin's children, providing guidance not just in their studies but also in developing their character according to Islamic principles. The Prophet Muhammad was the greatest mentor, and his companions learned by observing his example and receiving his guidance.",
    image: "/mentorship.png",
    choices: [
      {
        id: "mentorship-1",
        text: "Focus on Adab (Islamic etiquette) alongside academics",
        outcome:
          "You emphasize the importance of Adab (Islamic etiquette and character) alongside academic excellence, helping the children develop into well-rounded individuals with strong moral foundations.",
        score: 9,
        tags: ["wisdom", "knowledge"],
        nextId: "community-impact", // This connects to community impact
      },
      {
        id: "mentorship-2",
        text: "Teach financial literacy from an Islamic perspective",
        outcome:
          "You incorporate lessons on financial literacy from an Islamic perspective, teaching principles of halal earning, avoiding Riba, giving Zakat and Sadaqah, and responsible spending.",
        score: 8,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
      {
        id: "mentorship-3",
        text: "Encourage community service as an Islamic value",
        outcome:
          "You encourage the children to participate in community service, helping them understand the Islamic emphasis on serving others and contributing positively to society.",
        score: 8,
        tags: ["community", "compassion"],
        nextId: "community-impact", // MERGING: Same as above
      },
      {
        id: "mentorship-4",
        text: "Guide them in balancing deen (religion) and dunya (worldly affairs)",
        outcome:
          "You help the children navigate the balance between deen (religious obligations) and dunya (worldly pursuits), teaching them that Islam encompasses all aspects of life rather than being compartmentalized.",
        score: 10,
        tags: ["wisdom", "balance", "knowledge"],
        nextId: "final-reflection", // This leads to the final reflection
      },
    ],
  },

  // NEW SCENARIO: Community Impact
  {
    id: "community-impact",
    title: "Broader Community Impact",
    description:
      "Your actions regarding your cousin's situation and your implementation of Islamic financial principles have had a ripple effect in your community. Others have observed how you handled the situation and have been influenced by your approach to financial ethics based on Islamic principles.",
    image: "/community-impact.png",
    choices: [
      {
        id: "community-impact-1",
        text: "Share your experience as a case study in Islamic finance",
        outcome:
          "You share your experience as a case study in ethical decision-making based on Islamic principles, helping others learn how to apply Sharia guidelines to real-life financial situations.",
        score: 8,
        tags: ["knowledge", "community"],
        nextId: "final-reflection", // This leads to the final reflection
      },
      {
        id: "community-impact-2",
        text: "Help establish a community-based Islamic financial institution",
        outcome:
          "Inspired by your experience, you work with community members to establish a formal Islamic financial institution that provides Sharia-compliant services to meet local needs.",
        score: 10,
        tags: ["leadership", "community", "knowledge"],
        nextId: "final-reflection", // This leads to the final reflection
      },
      {
        id: "community-impact-3",
        text: "Mentor others in Islamic financial ethics",
        outcome:
          "You offer to mentor others facing similar ethical dilemmas, providing guidance based on your experience and knowledge of Islamic financial principles.",
        score: 9,
        tags: ["knowledge", "compassion", "leadership"],
        nextId: "final-reflection", // This leads to the final reflection
      },
      {
        id: "community-impact-4",
        text: "Advocate for greater Islamic financial literacy",
        outcome:
          "You become an advocate for greater Islamic financial literacy in your community, working to ensure that more Muslims understand how to align their financial decisions with their faith.",
        score: 9,
        tags: ["knowledge", "leadership", "community"],
        nextId: "final-reflection", // This leads to the final reflection
      },
    ],
  },

  // Final reflection scenario
  {
    id: "final-reflection",
    title: "Reflecting on Your Journey",
    description:
      "As you reflect on the decisions you've made throughout this situation with your cousin and his family, you consider what you've learned about applying Islamic financial principles and ethics in real-life situations. The Prophet Muhammad said, 'Reflect upon Allah's creation, but do not reflect upon Allah's essence.'",
    image: "/reflection.png",
    choices: [
      {
        id: "final-reflection-1",
        text: "Complete your reflection and see your results",
        outcome:
          "Your ethical journey has provided insights into how you apply Islamic principles in challenging financial situations, deepening your understanding of Sharia-compliant approaches to helping others.",
        score: 0,
        tags: ["wisdom"],
        nextId: "end",
      },
      {
        id: "final-reflection-2",
        text: "Consider how to further develop your knowledge of Islamic finance",
        outcome:
          "You reflect on areas where you could deepen your understanding of Islamic finance and make plans to continue learning about Sharia-compliant approaches to financial matters.",
        score: 5,
        tags: ["knowledge", "wisdom"],
        nextId: "islamic-finance-education", // CIRCULAR PATH: This connects back to Islamic finance education
      },
      {
        id: "final-reflection-3",
        text: "Commit to implementing more Islamic financial principles",
        outcome:
          "You make a personal commitment to more fully implement Islamic financial principles in your own life, recognizing areas where you can better align your practices with Sharia guidelines.",
        score: 6,
        tags: ["implementation", "integrity"],
        nextId: "knowledge-application", // CIRCULAR PATH: This connects back to knowledge application
      },
      {
        id: "final-reflection-4",
        text: "Plan how to share your knowledge with others",
        outcome:
          "You develop a plan for sharing your knowledge and experience with others in your community, recognizing that spreading beneficial knowledge is a form of Sadaqah Jariyah (continuous charity).",
        score: 7,
        tags: ["knowledge", "community", "generosity"],
        nextId: "community-impact", // CIRCULAR PATH: This connects back to community impact
      },
    ],
  },

  // End scenario
  {
    id: "end",
    title: "Journey Complete",
    description:
      "You have completed your ethical journey through Islamic financial principles. Your choices reflect your understanding of how to apply Sharia guidelines in everyday financial situations. Remember that in real life, these situations are complex, and it's important to seek knowledge and guidance from qualified scholars when needed.",
    image: "/journey-complete.png",
    choices: [
      {
        id: "end-1",
        text: "Start a new journey",
        outcome: "",
        score: 0,
        tags: [],
        nextId: "start",
      },
      {
        id: "end-2",
        text: "Explore a different path",
        outcome: "",
        score: 0,
        tags: [],
        nextId: "family-request", // CIRCULAR PATH: This allows players to explore different choices
      },
      {
        id: "end-3",
        text: "Learn more about Islamic finance concepts",
        outcome: "",
        score: 0,
        tags: [],
        nextId: "islamic-finance-education", // This connects to Islamic finance education
      },
    ],
  },
]
