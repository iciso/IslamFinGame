"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types
export interface Choice {
  id: string
  text: string
  outcome: string
  nextScenario: string
  score: number
  tags: string[]
}

export interface Scenario {
  id: string
  title: string
  description: string
  choices: Choice[]
}

interface GameState {
  currentScenario: string
  history: {
    scenarioId: string
    choiceId: string
    score: number
    tags: string[]
  }[]
  totalScore: number
  traits: Record<string, number>
  showOutcome: boolean
  selectedChoice: Choice | null
  scenarios: Record<string, Scenario>
  // Actions
  selectChoice: (choice: Choice) => void
  continueToNextScenario: () => void
  resetGame: () => void
  directNavigate: (scenarioId: string) => void
}

// Define scenarios
const scenarios: Record<string, Scenario> = {
  start: {
    id: "start",
    title: "Islamic Financial Ethics Journey",
    description:
      "Welcome to a journey through Islamic financial ethics. You will face various scenarios that test your understanding of Islamic financial principles and ethical decision-making. Your choices will affect your score and reveal your ethical traits.",
    choices: [
      {
        id: "start-1",
        text: "Begin the journey",
        outcome: "You embark on a journey of ethical financial decision-making.",
        nextScenario: "family-request",
        score: 0,
        tags: [],
      },
    ],
  },
  "family-request": {
    id: "family-request",
    title: "Family Financial Request",
    description:
      "Your cousin approaches you for financial help. He needs $5,000 to pay for his child's school fees. He offers to pay you back with 5% interest over 6 months, knowing you could use the extra money.",
    choices: [
      {
        id: "family-request-1",
        text: "Accept the loan terms with interest",
        outcome:
          "You agree to the loan with interest. While this helps your cousin in the short term, accepting Riba (interest) goes against Islamic financial principles, which prohibit earning money from money without sharing risk.",
        nextScenario: "loan-terms",
        score: -10,
        tags: ["worldly", "pragmatic"],
      },
      {
        id: "family-request-2",
        text: "Refuse to help",
        outcome:
          "You explain that you cannot engage in interest-based transactions as they constitute Riba, which is prohibited in Islam. However, refusing to help family in need without offering alternatives may not align with Islamic values of compassion and family support.",
        nextScenario: "after-refusal",
        score: -5,
        tags: ["principled", "strict"],
      },
      {
        id: "family-request-3",
        text: "Offer an interest-free loan (Qard Hasan)",
        outcome:
          "You offer an interest-free loan (Qard Hasan), explaining that this aligns with Islamic principles while still helping your cousin. This demonstrates both compassion and adherence to Islamic financial ethics.",
        nextScenario: "loan-repayment",
        score: 15,
        tags: ["balanced", "ethical"],
      },
      {
        id: "family-request-4",
        text: "Give part as charity (Sadaqah) and part as an interest-free loan",
        outcome:
          "You decide to give $2,000 as charity (Sadaqah) and $3,000 as an interest-free loan (Qard Hasan). This balanced approach shows generosity while still encouraging responsibility, embodying Islamic values of charity and mutual support.",
        nextScenario: "after-charity",
        score: 20,
        tags: ["generous", "compassionate"],
      },
      {
        id: "family-request-5",
        text: "Offer to pay the school directly",
        outcome:
          "You offer to pay the school fees directly. This ensures the money is used for its intended purpose while helping your cousin. This approach demonstrates wisdom and responsibility in financial assistance.",
        nextScenario: "after-direct-payment",
        score: 15,
        tags: ["practical", "wise"],
      },
    ],
  },
  "loan-terms": {
    id: "loan-terms",
    title: "Setting Loan Terms",
    description:
      "You've agreed to lend money with interest. As you prepare the agreement, you reflect on the Islamic prohibition of Riba (interest) and the spiritual implications of your decision.",
    choices: [
      {
        id: "loan-terms-1",
        text: "Continue with the interest-based loan but donate the interest to charity",
        outcome:
          "While donating the interest to charity shows good intentions, it doesn't change the nature of the transaction. In Islamic finance, the means are as important as the ends, and Riba remains prohibited regardless of how the proceeds are used.",
        nextScenario: "inner-struggle",
        score: -5,
        tags: ["compromising", "pragmatic"],
      },
      {
        id: "loan-terms-2",
        text: "Reconsider and change to an interest-free loan",
        outcome:
          "Upon reflection, you decide to change the terms to an interest-free loan (Qard Hasan). This shows your commitment to Islamic principles and your willingness to correct your course when you recognize an error.",
        nextScenario: "loan-repayment",
        score: 10,
        tags: ["reflective", "principled"],
      },
      {
        id: "loan-terms-3",
        text: "Propose a Mudarabah (profit-sharing) arrangement instead",
        outcome:
          "You propose a Mudarabah arrangement where you provide capital for a small business idea your cousin has, sharing profits instead of charging interest. This aligns with Islamic finance principles of risk-sharing and entrepreneurship.",
        nextScenario: "islamic-business-partnership",
        score: 15,
        tags: ["innovative", "entrepreneurial"],
      },
    ],
  },
  "after-refusal": {
    id: "after-refusal",
    title: "After Refusing Help",
    description:
      "A week after refusing to help your cousin, you learn that he had to take a high-interest loan from a conventional bank to pay the school fees. You feel conflicted about your decision.",
    choices: [
      {
        id: "after-refusal-1",
        text: "Maintain that you made the right decision based on principles",
        outcome:
          "While adhering to principles is important, Islamic ethics also emphasize compassion and finding permissible alternatives to help others. Sometimes rigid application of rules without considering alternatives can lead to greater harm.",
        nextScenario: "family-relations",
        score: -5,
        tags: ["rigid", "principled"],
      },
      {
        id: "after-refusal-2",
        text: "Approach your cousin and offer an Islamic alternative now",
        outcome:
          "You approach your cousin and offer to help him refinance the conventional loan through an interest-free arrangement. This demonstrates that Islamic principles are meant to be applied with wisdom and compassion, not rigidity.",
        nextScenario: "reconciliation",
        score: 10,
        tags: ["reflective", "balanced"],
      },
      {
        id: "after-refusal-3",
        text: "Research Islamic financial alternatives for future situations",
        outcome:
          "You decide to educate yourself about Islamic financial alternatives so you can better help in the future. This shows a commitment to growth and learning, which is valued in Islam. Knowledge without action has limited benefit, but preparing for future situations is wise.",
        nextScenario: "islamic-finance-education",
        score: 5,
        tags: ["growth-oriented", "reflective"],
      },
    ],
  },
  "after-charity": {
    id: "after-charity",
    title: "Impact of Your Charity",
    description:
      "Six months have passed since you gave part charity and part interest-free loan to your cousin. He has successfully paid half of the loan and his child is thriving in school. He invites you to a family gathering and publicly acknowledges your help.",
    choices: [
      {
        id: "after-charity-1",
        text: "Accept the acknowledgment and share how it aligned with Islamic principles",
        outcome:
          "You graciously accept the acknowledgment and briefly explain how your approach aligned with Islamic financial ethics. This serves as educational for others present and reinforces positive financial behaviors in the community.",
        nextScenario: "knowledge-application",
        score: 10,
        tags: ["educational", "principled"],
      },
      {
        id: "after-charity-2",
        text: "Politely downplay your contribution, emphasizing that it was your duty",
        outcome:
          "You modestly downplay your contribution, emphasizing that helping family is a duty in Islam. This demonstrates the Islamic virtue of humility (Tawadu') and sincerity (Ikhlas) in giving, where one gives for Allah's pleasure rather than recognition.",
        nextScenario: "anonymous-giving",
        score: 15,
        tags: ["humble", "sincere"],
      },
      {
        id: "after-charity-3",
        text: "Use the opportunity to establish a family emergency fund based on Islamic principles",
        outcome:
          "Inspired by this positive experience, you propose establishing a family Takaful (mutual support) fund where members contribute regularly and interest-free loans or assistance can be provided to those in need. This demonstrates forward-thinking application of Islamic financial principles.",
        nextScenario: "takaful-system",
        score: 20,
        tags: ["visionary", "community-oriented"],
      },
    ],
  },
  "after-direct-payment": {
    id: "after-direct-payment",
    title: "School Recognition",
    description:
      "The school recognizes your contribution and offers to put your name on their donors' wall. Your cousin's child is doing well academically, and the school principal suggests that you might consider supporting their scholarship fund for other needy students.",
    choices: [
      {
        id: "after-direct-payment-1",
        text: "Accept the recognition and donate to the scholarship fund",
        outcome:
          "You accept the recognition and make a donation to the scholarship fund. While this is generous, accepting public recognition for charity may diminish its spiritual reward in Islam, which emphasizes giving secretly when possible.",
        nextScenario: "charity-impact",
        score: 5,
        tags: ["generous", "public"],
      },
      {
        id: "after-direct-payment-2",
        text: "Decline the recognition but donate anonymously to the fund",
        outcome:
          "You politely decline the public recognition but make an anonymous donation to the scholarship fund. This aligns with the Islamic preference for anonymous charity, which is considered more sincere and carries greater spiritual reward.",
        nextScenario: "anonymous-giving",
        score: 15,
        tags: ["humble", "sincere"],
      },
      {
        id: "after-direct-payment-3",
        text: "Propose establishing a Waqf (endowment) for educational purposes",
        outcome:
          "You propose establishing a Waqf (Islamic endowment) for educational purposes, where the principal amount remains intact while the returns are used for scholarships. This sustainable approach to charity is highly regarded in Islam and creates ongoing benefit (Sadaqah Jariyah).",
        nextScenario: "waqf-establishment",
        score: 20,
        tags: ["visionary", "sustainable"],
      },
    ],
  },
  "inner-struggle": {
    id: "inner-struggle",
    title: "Inner Ethical Struggle",
    description:
      "Despite donating the interest to charity, you feel spiritually uncomfortable with your interest-based loan arrangement. During prayer, you find yourself reflecting deeply on whether your compromise aligns with your values.",
    choices: [
      {
        id: "inner-struggle-1",
        text: "Continue the arrangement, reasoning that your intention is good",
        outcome:
          "You decide to continue with the arrangement, focusing on your good intention. However, in Islamic ethics, good intentions don't make prohibited actions permissible. This approach reflects a misunderstanding of how Islamic principles apply to financial transactions.",
        nextScenario: "worldly-distraction",
        score: -10,
        tags: ["compromising", "intention-focused"],
      },
      {
        id: "inner-struggle-2",
        text: "Restructure the loan to be interest-free, even if it means financial loss for you",
        outcome:
          "You decide to restructure the loan as interest-free, prioritizing spiritual well-being over material gain. This demonstrates the Islamic principle that spiritual growth and ethical integrity are more valuable than worldly gain.",
        nextScenario: "spiritual-awakening",
        score: 15,
        tags: ["principled", "spiritual"],
      },
      {
        id: "inner-struggle-3",
        text: "Consult with a knowledgeable Islamic scholar about your situation",
        outcome:
          "You seek guidance from a knowledgeable Islamic scholar who helps you understand the principles better and suggests alternatives. This demonstrates humility and a commitment to learning and growing in your understanding of Islamic finance.",
        nextScenario: "islamic-finance-education",
        score: 10,
        tags: ["growth-oriented", "humble"],
      },
    ],
  },
  "worldly-distraction": {
    id: "worldly-distraction",
    title: "Worldly Success vs. Spiritual Growth",
    description:
      "Your business is thriving financially, but you notice that as you've compromised on some Islamic financial principles, it's becoming easier to justify other compromises. You're invited to invest in a lucrative opportunity that involves financing a mixed business with some prohibited elements.",
    choices: [
      {
        id: "worldly-distraction-1",
        text: "Take the investment opportunity, planning to donate some profits to charity",
        outcome:
          "You decide to invest, rationalizing that the good from your charity will outweigh the questionable aspects. This approach reflects a slippery slope in ethical decision-making, where initial compromises lead to greater ones, and demonstrates how material success can cloud spiritual judgment.",
        nextScenario: "wealth-test",
        score: -15,
        tags: ["materialistic", "compromising"],
      },
      {
        id: "worldly-distraction-2",
        text: "Decline the investment and reassess all your business dealings for compliance with Islamic principles",
        outcome:
          "You decline the investment and take time to review all your business dealings against Islamic principles, making necessary changes. This demonstrates courage and commitment to ethical integrity, even when it means potential financial sacrifice.",
        nextScenario: "spiritual-awakening",
        score: 20,
        tags: ["principled", "reflective"],
      },
      {
        id: "worldly-distraction-3",
        text: "Look for an alternative, ethically compliant investment with potentially lower returns",
        outcome:
          "You seek out an alternative investment that fully complies with Islamic principles, even though it offers lower returns. This balanced approach shows that you value ethical compliance while still engaging in business and seeking permissible profit.",
        nextScenario: "islamic-business-partnership",
        score: 15,
        tags: ["balanced", "ethical"],
      },
    ],
  },
  "wealth-test": {
    id: "wealth-test",
    title: "The Test of Wealth",
    description:
      "Your wealth has increased significantly, but you find yourself constantly busy with business and less connected to your spiritual practices and community. A friend comments that you seem changed by your financial success.",
    choices: [
      {
        id: "wealth-test-1",
        text: "Defend your choices, emphasizing the charitable donations you make",
        outcome:
          "You defend your lifestyle, pointing to your charitable giving. However, in Islam, wealth is a test and a trust from Allah, not just in how much you give, but in how you earn, spend, and whether it distracts from remembrance of Allah and the hereafter.",
        nextScenario: "final-reflection",
        score: -5,
        tags: ["defensive", "materialistic"],
      },
      {
        id: "wealth-test-2",
        text: "Reflect deeply and make significant changes to rebalance your life",
        outcome:
          "You take your friend's comment as a wake-up call and make significant changes: restructuring your business to be fully Shariah-compliant, simplifying your lifestyle, increasing charitable giving, and making time for spiritual practices and community. This demonstrates the Islamic understanding that wealth is a means, not an end.",
        nextScenario: "spiritual-awakening",
        score: 20,
        tags: ["reflective", "balanced"],
      },
      {
        id: "wealth-test-3",
        text: "Establish a structured approach to ensure your wealth benefits the community",
        outcome:
          "You establish a structured approach to your wealth: setting aside fixed percentages for charity, community projects, and ethical investments, while also scheduling regular time for spiritual development. This systematic approach helps ensure your wealth becomes a tool for good rather than a spiritual distraction.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["systematic", "community-oriented"],
      },
    ],
  },
  "spiritual-awakening": {
    id: "spiritual-awakening",
    title: "Spiritual Renewal",
    description:
      "After realigning your financial practices with Islamic principles, you experience a sense of spiritual renewal and peace. You notice that while some business opportunities have been closed to you, others have unexpectedly opened, and your relationships have improved.",
    choices: [
      {
        id: "spiritual-awakening-1",
        text: "Share your journey with others who might benefit from your experience",
        outcome:
          "You share your journey of financial and spiritual realignment with others who might benefit, being careful to speak with humility rather than self-righteousness. This demonstrates the Islamic value of nasihah (sincere advice) and da'wah (invitation to good) through personal example.",
        nextScenario: "knowledge-application",
        score: 15,
        tags: ["educational", "community-oriented"],
      },
      {
        id: "spiritual-awakening-2",
        text: "Focus on deepening your own knowledge and practice of Islamic finance",
        outcome:
          "You decide to deepen your knowledge of Islamic finance through further study and application. This demonstrates the Islamic principle that seeking knowledge is a lifelong journey and that true understanding comes through both study and practice.",
        nextScenario: "islamic-finance-education",
        score: 10,
        tags: ["growth-oriented", "reflective"],
      },
      {
        id: "spiritual-awakening-3",
        text: "Use your experience to create structural changes in your community's financial practices",
        outcome:
          "You work with community leaders to establish resources and systems that make Islamic financial practices more accessible to everyone: educational programs, interest-free loan funds, and ethical investment opportunities. This demonstrates how individual transformation can lead to community transformation.",
        nextScenario: "community-resources",
        score: 20,
        tags: ["visionary", "community-oriented"],
      },
    ],
  },
  "delayed-charity": {
    id: "delayed-charity",
    title: "The Delayed Charity",
    description:
      "You've been planning to give a significant charity donation from your business profits, but you've been delaying it to grow your business further first. Unexpectedly, your business faces a temporary financial challenge.",
    choices: [
      {
        id: "delayed-charity-1",
        text: "Further delay your charitable giving until your business is more stable",
        outcome:
          "You decide to further delay your charity until business improves. While this seems prudent financially, in Islamic understanding, charity does not decrease wealth but may increase it, and delaying good deeds when able to perform them can be a missed opportunity for barakah (blessing).",
        nextScenario: "wealth-test",
        score: -5,
        tags: ["cautious", "business-focused"],
      },
      {
        id: "delayed-charity-2",
        text: "Give charity despite the financial challenge, trusting in divine provision",
        outcome:
          "You decide to give charity despite the financial challenge, trusting in Allah's promise that charity does not decrease wealth. This demonstrates tawakkul (trust in Allah) and the Islamic principle that giving in times of personal need carries special spiritual value.",
        nextScenario: "charity-impact",
        score: 20,
        tags: ["faithful", "generous"],
      },
      {
        id: "delayed-charity-3",
        text: "Adjust the amount but give something, while creating a structured plan for future giving",
        outcome:
          "You adjust the amount to what you can currently manage while creating a structured plan for regular giving going forward. This balanced approach demonstrates both prudence and commitment to charitable giving as an ongoing practice rather than a one-time event.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["balanced", "systematic"],
      },
    ],
  },
  reconciliation: {
    id: "reconciliation",
    title: "Family Reconciliation",
    description:
      "After offering to help your cousin refinance his conventional loan with an Islamic alternative, your relationship has improved. He expresses interest in learning more about Islamic finance principles that guided your decision.",
    choices: [
      {
        id: "reconciliation-1",
        text: "Share basic principles but emphasize that you're not an expert",
        outcome:
          "You share some basic principles while emphasizing your limited expertise and encouraging him to seek proper knowledge. This demonstrates humility and responsibility in not overstepping your knowledge boundaries while still providing beneficial information.",
        nextScenario: "islamic-finance-education",
        score: 10,
        tags: ["humble", "responsible"],
      },
      {
        id: "reconciliation-2",
        text: "Offer to learn together by attending a course on Islamic finance",
        outcome:
          "You suggest attending an Islamic finance course together, making it a shared learning journey. This demonstrates the Islamic values of seeking knowledge as a lifelong pursuit and strengthening family bonds through shared beneficial activities.",
        nextScenario: "knowledge-application",
        score: 15,
        tags: ["growth-oriented", "relational"],
      },
      {
        id: "reconciliation-3",
        text: "Connect him with community resources and scholars who can provide guidance",
        outcome:
          "You connect your cousin with community resources, scholars, and institutions that can provide proper guidance on Islamic finance. This demonstrates the importance of building networks of knowledge and support within the community.",
        nextScenario: "community-resources",
        score: 15,
        tags: ["community-oriented", "resourceful"],
      },
    ],
  },
  "loan-repayment": {
    id: "loan-repayment",
    title: "Loan Repayment Situation",
    description:
      "Your cousin who received the interest-free loan (Qard Hasan) is struggling to make payments on time due to unexpected medical expenses. The agreed repayment period is nearing its end.",
    choices: [
      {
        id: "loan-repayment-1",
        text: "Strictly enforce the original agreement and repayment schedule",
        outcome:
          "You insist on the original repayment schedule. While contracts should be honored in Islam, there is also strong emphasis on showing leniency to debtors facing genuine hardship. The Prophet Muhammad encouraged creditors to give more time to debtors in difficulty.",
        nextScenario: "family-relations",
        score: -5,
        tags: ["strict", "contract-focused"],
      },
      {
        id: "loan-repayment-2",
        text: "Extend the repayment period without any penalty",
        outcome:
          "You extend the repayment period without penalty, showing understanding of your cousin's circumstances. This aligns with the Quranic guidance: 'If the debtor is in difficulty, grant him time till it is easy for him to repay' (2:280), demonstrating compassion while still maintaining the expectation of repayment.",
        nextScenario: "family-relations",
        score: 15,
        tags: ["compassionate", "flexible"],
      },
      {
        id: "loan-repayment-3",
        text: "Forgive a portion of the loan given the medical circumstances",
        outcome:
          "You decide to forgive a portion of the loan given the medical hardship. This exemplifies the highest level of virtue mentioned in the same Quranic verse: 'But if you remit it by way of charity, that is best for you if you only knew' (2:280), demonstrating that sometimes complete or partial loan forgiveness is the most virtuous action.",
        nextScenario: "charity-impact",
        score: 20,
        tags: ["generous", "compassionate"],
      },
    ],
  },
  "community-resources": {
    id: "community-resources",
    title: "Developing Community Resources",
    description:
      "Inspired by your experiences, you're considering how to help develop better Islamic financial resources in your community. Many community members struggle with conventional financial systems that don't align with their values.",
    choices: [
      {
        id: "community-resources-1",
        text: "Start small by organizing educational workshops on Islamic finance",
        outcome:
          "You begin organizing educational workshops on Islamic finance basics. This grassroots educational approach addresses the knowledge gap that often prevents people from implementing Islamic financial principles in their lives.",
        nextScenario: "islamic-finance-education",
        score: 10,
        tags: ["educational", "grassroots"],
      },
      {
        id: "community-resources-2",
        text: "Work with the local mosque to establish a community interest-free loan fund",
        outcome:
          "You work with your local mosque to establish a Qard Hasan (interest-free loan) fund for community members in need. This practical implementation of Islamic financial principles creates a sustainable resource that can help many people over time.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["practical", "community-oriented"],
      },
      {
        id: "community-resources-3",
        text: "Collaborate with professionals to create a comprehensive Islamic financial ecosystem",
        outcome:
          "You bring together Islamic scholars, financial professionals, and community leaders to develop a comprehensive approach: educational programs, financial counseling services, interest-free loan funds, and ethical investment opportunities. This holistic approach addresses multiple community needs simultaneously.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["visionary", "collaborative"],
      },
    ],
  },
  "waqf-establishment": {
    id: "waqf-establishment",
    title: "Establishing an Educational Waqf",
    description:
      "You're working with legal and financial advisors to establish a Waqf (endowment) for educational scholarships. You need to make decisions about its structure, management, and focus areas.",
    choices: [
      {
        id: "waqf-establishment-1",
        text: "Create a simple structure focusing only on school scholarships",
        outcome:
          "You establish a straightforward Waqf dedicated to school scholarships. This focused approach ensures clarity of purpose and simplicity in management, though it may be limited in scope.",
        nextScenario: "education-outcomes",
        score: 10,
        tags: ["focused", "practical"],
      },
      {
        id: "waqf-establishment-2",
        text: "Develop a comprehensive Waqf that supports multiple educational initiatives",
        outcome:
          "You develop a comprehensive Waqf supporting diverse educational needs: scholarships, teacher training, educational materials, and school infrastructure. This broader approach reflects the historical tradition of Islamic Waqfs that often served multiple community needs simultaneously.",
        nextScenario: "education-outcomes",
        score: 15,
        tags: ["comprehensive", "visionary"],
      },
      {
        id: "waqf-establishment-3",
        text: "Create a collaborative Waqf model that pools resources from multiple donors",
        outcome:
          "You establish a collaborative Waqf model that allows multiple community members to contribute, regardless of amount, creating a larger collective endowment. This innovative approach makes Waqf participation accessible to more people and builds community ownership.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["innovative", "inclusive"],
      },
    ],
  },
  "takaful-system": {
    id: "takaful-system",
    title: "Family Takaful System",
    description:
      "Your proposal for a family mutual assistance fund based on Takaful principles has generated interest. Now you need to establish its structure, contribution system, and governance.",
    choices: [
      {
        id: "takaful-system-1",
        text: "Create a simple system with equal contributions and basic governance",
        outcome:
          "You establish a straightforward system with equal contributions from all participating family members and basic governance rules. This simple approach makes it easy to start but may not account for differences in financial capacity or complex situations.",
        nextScenario: "family-relations",
        score: 10,
        tags: ["practical", "straightforward"],
      },
      {
        id: "takaful-system-2",
        text: "Develop a proportional contribution system based on financial capacity",
        outcome:
          "You develop a system where family members contribute according to their financial capacity, with clear governance and decision-making processes. This equitable approach reflects Islamic principles of justice and fairness while recognizing different financial situations.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["equitable", "systematic"],
      },
      {
        id: "takaful-system-3",
        text: "Consult with an Islamic finance expert to create a comprehensive model",
        outcome:
          "You consult with an Islamic finance expert to create a comprehensive model that incorporates best practices from traditional and modern Takaful systems. This professional approach ensures that the system is both Shariah-compliant and financially sustainable.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["professional", "thorough"],
      },
    ],
  },
  "islamic-business-partnership": {
    id: "islamic-business-partnership",
    title: "Islamic Business Partnership",
    description:
      "You've entered into a Mudarabah (profit-sharing) partnership where you provide capital and your partner provides expertise and management. The business is facing some initial challenges but shows promise.",
    choices: [
      {
        id: "islamic-business-partnership-1",
        text: "Closely monitor and frequently intervene in business operations",
        outcome:
          "You closely monitor and frequently intervene in operations. While due diligence is important, excessive intervention in a Mudarabah contradicts its nature, where the capital provider trusts the manager's expertise. This approach can create tension and undermine the partnership.",
        nextScenario: "business-outcomes",
        score: -5,
        tags: ["controlling", "untrusting"],
      },
      {
        id: "islamic-business-partnership-2",
        text: "Maintain appropriate oversight while respecting your partner's management role",
        outcome:
          "You maintain appropriate oversight through regular reports and consultations while respecting your partner's management role. This balanced approach reflects the Islamic emphasis on both trust (amanah) and verification, creating a healthy partnership dynamic.",
        nextScenario: "business-outcomes",
        score: 15,
        tags: ["balanced", "respectful"],
      },
      {
        id: "islamic-business-partnership-3",
        text: "Provide additional support and resources to help overcome challenges",
        outcome:
          "Beyond your capital investment, you offer additional support through relevant connections, advice, and resources, while still respecting your partner's management authority. This supportive approach strengthens the partnership and demonstrates commitment to mutual success.",
        nextScenario: "business-outcomes",
        score: 20,
        tags: ["supportive", "resourceful"],
      },
    ],
  },
  "business-outcomes": {
    id: "business-outcomes",
    title: "Business Growth and Decisions",
    description:
      "Your Islamic business partnership has become successful. Now you face decisions about growth, profit distribution, and potential expansion into new areas.",
    choices: [
      {
        id: "business-outcomes-1",
        text: "Focus on maximizing profit distribution to partners",
        outcome:
          "You focus primarily on maximizing profit distribution to partners. While profit is a legitimate goal in Islamic business, focusing exclusively on profit distribution without balanced attention to other stakeholders (employees, community, sustainability) reflects a limited understanding of Islamic business ethics.",
        nextScenario: "wealth-test",
        score: 0,
        tags: ["profit-focused", "short-term"],
      },
      {
        id: "business-outcomes-2",
        text: "Reinvest significantly in business growth and employee development",
        outcome:
          "You choose to reinvest significantly in business growth and employee development, including fair wages, training, and good working conditions. This approach reflects the Islamic understanding that business should create value beyond profit and that employees have important rights.",
        nextScenario: "mentorship",
        score: 15,
        tags: ["growth-oriented", "employee-focused"],
      },
      {
        id: "business-outcomes-3",
        text: "Balance profit distribution with reinvestment and community impact",
        outcome:
          "You create a balanced approach: reasonable profit distribution, strategic reinvestment, fair employee practices, and community benefit initiatives. This holistic approach reflects the Islamic ideal of business as a means to create multiple forms of value: financial, social, and spiritual.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["balanced", "holistic"],
      },
    ],
  },
  "islamic-finance-education": {
    id: "islamic-finance-education",
    title: "Deepening Financial Knowledge",
    description:
      "You've committed to deepening your understanding of Islamic finance. You're exploring various educational resources and approaches to learning.",
    choices: [
      {
        id: "islamic-finance-education-1",
        text: "Focus on self-study through books and online resources",
        outcome:
          "You focus on self-study through books and online resources. This independent approach allows you to learn at your own pace and focus on areas of personal interest, though it may lack the guidance and correction that comes from teachers and peer discussion.",
        nextScenario: "knowledge-application",
        score: 10,
        tags: ["self-directed", "independent"],
      },
      {
        id: "islamic-finance-education-2",
        text: "Enroll in a structured course with qualified instructors",
        outcome:
          "You enroll in a structured course with qualified instructors who can provide guidance and answer questions. This formal approach provides systematic knowledge and credentials, reflecting the Islamic tradition of seeking knowledge from qualified teachers.",
        nextScenario: "knowledge-application",
        score: 15,
        tags: ["structured", "thorough"],
      },
      {
        id: "islamic-finance-education-3",
        text: "Combine formal learning with a study group for discussion and application",
        outcome:
          "You combine formal instruction with a community study group where you can discuss concepts and their practical application. This comprehensive approach reflects the Islamic educational tradition that balances theoretical knowledge with practical application and community learning.",
        nextScenario: "knowledge-application",
        score: 20,
        tags: ["comprehensive", "community-oriented"],
      },
    ],
  },
  "knowledge-application": {
    id: "knowledge-application",
    title: "Applying Financial Knowledge",
    description:
      "With your deepened understanding of Islamic finance, you're considering how best to apply this knowledge in ways that benefit both yourself and others.",
    choices: [
      {
        id: "knowledge-application-1",
        text: "Apply the principles primarily to optimize your own financial practices",
        outcome:
          "You focus on applying Islamic financial principles to your own financial practices. While personal application is important and beneficial, limiting knowledge application to personal benefit doesn't fulfill the Islamic encouragement to share beneficial knowledge with others.",
        nextScenario: "final-reflection",
        score: 5,
        tags: ["self-focused", "practical"],
      },
      {
        id: "knowledge-application-2",
        text: "Share your knowledge informally with friends and family who could benefit",
        outcome:
          "You share your knowledge informally with friends and family who could benefit, being careful to clarify when you're reaching the limits of your understanding. This approach reflects the Prophet's encouragement to 'Convey from me, even if it is one verse.'",
        nextScenario: "family-relations",
        score: 15,
        tags: ["educational", "relational"],
      },
      {
        id: "knowledge-application-3",
        text: "Develop ways to make Islamic financial education more accessible in your community",
        outcome:
          "You work to develop accessible Islamic financial education in your community through workshops, resource development, and mentoring. This broader educational impact reflects the Islamic value placed on knowledge that benefits many people.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["community-oriented", "educational"],
      },
    ],
  },
  "family-relations": {
    id: "family-relations",
    title: "Family Financial Dynamics",
    description:
      "Your approach to financial matters has influenced your extended family's dynamics. Some family members appreciate your principled approach, while others find it impractical or restrictive.",
    choices: [
      {
        id: "family-relations-1",
        text: "Stand firm on your principles without much explanation or accommodation",
        outcome:
          "You stand firmly on your principles without much explanation or accommodation for different perspectives. While principled consistency is important, this rigid approach may create unnecessary division and miss opportunities to educate others through respectful dialogue.",
        nextScenario: "final-reflection",
        score: 0,
        tags: ["principled", "rigid"],
      },
      {
        id: "family-relations-2",
        text: "Explain your approach when relevant, but respect others' financial choices",
        outcome:
          "You explain your approach when relevant but respect others' financial choices even when different from yours. This balanced approach demonstrates both conviction in principles and respect for others' autonomy, reflecting the Quranic guidance that there is 'no compulsion in religion.'",
        nextScenario: "final-reflection",
        score: 15,
        tags: ["respectful", "balanced"],
      },
      {
        id: "family-relations-3",
        text: "Find creative ways to make Islamic financial approaches attractive and accessible to family",
        outcome:
          "You find creative ways to demonstrate the practical benefits and wisdom of Islamic financial approaches, making them attractive and accessible rather than imposing them. This approach reflects the Prophet's method of invitation through wisdom and beautiful preaching.",
        nextScenario: "mentorship",
        score: 20,
        tags: ["wise", "persuasive"],
      },
    ],
  },
  "anonymous-giving": {
    id: "anonymous-giving",
    title: "The Power of Anonymous Charity",
    description:
      "Your practice of giving anonymously has protected you from pride while helping others. You learn about a family in urgent need of financial help for medical treatment, and you have the means to help substantially.",
    choices: [
      {
        id: "anonymous-giving-1",
        text: "Give anonymously through an intermediary",
        outcome:
          "You arrange to give anonymously through a trusted intermediary. This approach embodies the highest level of charity in Islamic teachings, where the right hand doesn't know what the left hand gives, protecting both the giver from pride and the recipient from shame.",
        nextScenario: "charity-impact",
        score: 20,
        tags: ["sincere", "humble"],
      },
      {
        id: "anonymous-giving-2",
        text: "Give directly but discreetly, focusing on the family's dignity",
        outcome:
          "You give directly but discreetly, focusing on preserving the family's dignity. While not completely anonymous, this approach still reflects the Islamic emphasis on giving in ways that don't embarrass or create a sense of indebtedness in the recipient.",
        nextScenario: "charity-impact",
        score: 15,
        tags: ["compassionate", "dignifying"],
      },
      {
        id: "anonymous-giving-3",
        text: "Organize a community fundraising effort for the family",
        outcome:
          "You organize a community fundraising effort that both meets the family's need and builds community solidarity. While more public, this approach reflects the Islamic value of community mutual support and may help the family feel supported by the community rather than indebted to an individual.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["community-oriented", "resourceful"],
      },
    ],
  },
  "charity-impact": {
    id: "charity-impact",
    title: "The Ripple Effect of Charity",
    description:
      "You discover that your charitable giving has had unexpected positive ripple effects. The recipients have not only improved their situation but have also been inspired to help others when they became able.",
    choices: [
      {
        id: "charity-impact-1",
        text: "Feel personal satisfaction in the positive outcomes",
        outcome:
          "You feel personal satisfaction in the positive outcomes. While gratitude for being able to help others is appropriate, focusing on personal satisfaction can subtly shift charity from an act of worship and service to a source of ego gratification.",
        nextScenario: "final-reflection",
        score: 5,
        tags: ["self-aware", "reflective"],
      },
      {
        id: "charity-impact-2",
        text: "Express gratitude to Allah for the opportunity to be part of this chain of giving",
        outcome:
          "You express gratitude to Allah for the opportunity to be part of this chain of giving. This response reflects the Islamic understanding that the ability to give is itself a blessing from Allah, and that the giver is merely a channel for good rather than its source.",
        nextScenario: "final-reflection",
        score: 15,
        tags: ["grateful", "spiritual"],
      },
      {
        id: "charity-impact-3",
        text: "Look for ways to create more sustainable and far-reaching charitable impact",
        outcome:
          "Inspired by these ripple effects, you look for ways to create more sustainable and far-reaching charitable impact through strategic giving and community development initiatives. This forward-looking approach seeks to multiply beneficial outcomes.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["visionary", "strategic"],
      },
    ],
  },
  "education-outcomes": {
    id: "education-outcomes",
    title: "Educational Impact",
    description:
      "The educational initiatives you've supported are showing positive results. Students are completing their education and some are returning to contribute to the community. You're considering how to build on this success.",
    choices: [
      {
        id: "education-outcomes-1",
        text: "Continue the current programs without significant changes",
        outcome:
          "You decide to continue the current successful programs without significant changes. This consistent approach provides stability and allows the programs to become well-established, though it may miss opportunities for improvement and expansion.",
        nextScenario: "final-reflection",
        score: 10,
        tags: ["consistent", "stable"],
      },
      {
        id: "education-outcomes-2",
        text: "Expand the programs to reach more students and educational areas",
        outcome:
          "You expand the programs to reach more students and cover more educational areas. This growth-oriented approach increases the beneficial impact and creates opportunities for more people, reflecting the Islamic encouragement to increase good deeds.",
        nextScenario: "community-impact",
        score: 15,
        tags: ["expansive", "growth-oriented"],
      },
      {
        id: "education-outcomes-3",
        text: "Develop a mentorship component connecting successful graduates with current students",
        outcome:
          "You develop a mentorship component connecting successful graduates with current students. This innovative approach creates a self-reinforcing cycle of education and mentorship that builds community capacity from within, reflecting the Islamic tradition of knowledge transmission through teacher-student relationships.",
        nextScenario: "mentorship",
        score: 20,
        tags: ["innovative", "relationship-focused"],
      },
    ],
  },
  mentorship: {
    id: "mentorship",
    title: "The Mentorship Journey",
    description:
      "You've begun mentoring others in Islamic financial principles and practices. You find that teaching others deepens your own understanding and raises new questions for exploration.",
    choices: [
      {
        id: "mentorship-1",
        text: "Focus on sharing only what you're completely certain about",
        outcome:
          "You focus on sharing only what you're completely certain about. While this cautious approach helps avoid spreading misinformation, it may create an impression of Islamic finance as rigid or limited, when in reality it's a rich, nuanced field with diverse scholarly perspectives.",
        nextScenario: "final-reflection",
        score: 5,
        tags: ["cautious", "limited"],
      },
      {
        id: "mentorship-2",
        text: "Balance sharing established knowledge with acknowledging areas of ongoing learning",
        outcome:
          "You balance sharing established knowledge with honestly acknowledging areas where you're still learning. This transparent approach models intellectual humility and the Islamic understanding that seeking knowledge is a lifelong journey.",
        nextScenario: "final-reflection",
        score: 15,
        tags: ["balanced", "humble"],
      },
      {
        id: "mentorship-3",
        text: "Create a collaborative learning community where everyone contributes and grows",
        outcome:
          "You create a collaborative learning community where everyone both contributes and learns, regardless of their level of knowledge. This approach reflects the Islamic tradition of scholarly circles where knowledge is built collectively and even teachers continue to learn.",
        nextScenario: "community-impact",
        score: 20,
        tags: ["collaborative", "community-oriented"],
      },
    ],
  },
  "community-impact": {
    id: "community-impact",
    title: "Transforming Community Financial Practices",
    description:
      "The various Islamic financial initiatives you've been involved with are beginning to transform your community's financial practices and culture. More people are seeking ethical alternatives to conventional finance.",
    choices: [
      {
        id: "community-impact-1",
        text: "Take pride in your role as a catalyst for this positive change",
        outcome:
          "You take pride in your role as a catalyst for positive change. While recognizing positive outcomes is natural, focusing on your role rather than the community's collective achievement or divine guidance can subtly feed ego rather than humility.",
        nextScenario: "final-reflection",
        score: 5,
        tags: ["self-focused", "proud"],
      },
      {
        id: "community-impact-2",
        text: "Acknowledge the collective effort and divine guidance that made change possible",
        outcome:
          "You acknowledge that the positive changes resulted from collective community effort and divine guidance, not just your contribution. This humble perspective reflects the Islamic virtues of humility and recognizing that all good comes ultimately from Allah.",
        nextScenario: "final-reflection",
        score: 15,
        tags: ["humble", "community-minded"],
      },
      {
        id: "community-impact-3",
        text: "Work to institutionalize the changes so they become sustainable beyond any individual",
        outcome:
          "You work to institutionalize the positive changes through documentation, training, and organizational structures so they become sustainable beyond any individual's involvement. This forward-thinking approach reflects the Islamic concept of establishing ongoing benefit (sadaqah jariyah).",
        nextScenario: "final-reflection",
        score: 20,
        tags: ["visionary", "sustainable"],
      },
    ],
  },
  "final-reflection": {
    id: "final-reflection",
    title: "Journey Reflection",
    description:
      "As you reflect on your journey of applying Islamic financial ethics in various situations, you consider what has been most meaningful and what you've truly learned.",
    choices: [
      {
        id: "final-reflection-1",
        text: "The most valuable aspect has been improving your own financial practices",
        outcome:
          "You reflect that the most valuable aspect has been improving your own financial practices. While personal improvement is important, this individual-focused perspective misses the broader Islamic emphasis on community benefit and serving as a means of guidance for others.",
        nextScenario: "end",
        score: 5,
        tags: ["self-focused", "practical"],
      },
      {
        id: "final-reflection-2",
        text: "The most meaningful part has been helping others through financial means",
        outcome:
          "You reflect that the most meaningful part has been helping others through financial means. This service-oriented perspective aligns with the Islamic emphasis on benefiting others and recognizes wealth as a means to serve rather than an end in itself.",
        nextScenario: "end",
        score: 15,
        tags: ["service-oriented", "compassionate"],
      },
      {
        id: "final-reflection-3",
        text: "The deepest value has been seeing how financial decisions connect to spiritual growth",
        outcome:
          "You reflect that the deepest value has been seeing how financial decisions connect to spiritual growth and community wellbeing. This holistic perspective reflects the Islamic understanding that financial matters are inseparable from spiritual and social dimensions of life.",
        nextScenario: "end",
        score: 20,
        tags: ["holistic", "spiritual"],
      },
    ],
  },
  end: {
    id: "end",
    title: "Journey Completion",
    description:
      "You have completed your journey through Islamic financial ethics. Your decisions have shaped not only your financial practices but also your character and relationships. The principles you've engaged with are meant to guide ongoing financial decisions throughout life.",
    choices: [],
  },
}

// Create the store
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentScenario: "start",
      history: [],
      totalScore: 0,
      traits: {},
      showOutcome: false,
      selectedChoice: null,
      scenarios,

      selectChoice: (choice) => {
        set({
          selectedChoice: choice,
          showOutcome: true,
        })

        // Update traits
        const traits = { ...get().traits }
        choice.tags.forEach((tag) => {
          traits[tag] = (traits[tag] || 0) + 1
        })

        // Update history
        const history = [
          ...get().history,
          {
            scenarioId: get().currentScenario,
            choiceId: choice.id,
            score: choice.score,
            tags: choice.tags,
          },
        ]

        // Calculate total score
        const totalScore = history.reduce((sum, item) => sum + item.score, 0)

        set({
          traits,
          history,
          totalScore,
        })
      },

      continueToNextScenario: () => {
        const { selectedChoice } = get()
        if (selectedChoice) {
          set({
            currentScenario: selectedChoice.nextScenario,
            showOutcome: false,
            selectedChoice: null,
          })
        }
      },

      resetGame: () => {
        set({
          currentScenario: "start",
          history: [],
          totalScore: 0,
          traits: {},
          showOutcome: false,
          selectedChoice: null,
        })
      },

      directNavigate: (scenarioId) => {
        set({
          currentScenario: scenarioId,
          showOutcome: false,
          selectedChoice: null,
        })
      },
    }),
    {
      name: "islamic-ethics-game",
    },
  ),
)
