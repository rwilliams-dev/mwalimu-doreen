import { ChevronRight } from "lucide-react";

const eras = [
  {
    period: "Pre-colonial Kenya",
    years: "Before 1895",
    color: "bg-amber-100 border-amber-300 text-amber-800",
    dot: "bg-amber-500",
    summary:
      "Kenya was home to diverse communities — Bantu, Nilotic, and Cushitic peoples — each with rich traditions, trade networks, and social systems. The Swahili Coast flourished as a hub of commerce between Africa, Arabia, India, and Persia, giving birth to the Swahili language itself — a Bantu tongue enriched by Arabic, Persian, and Portuguese.",
    swahili_link:
      "Swahili (Kiswahili) emerged as a lingua franca along the East African coast, blending Bantu grammar with loan words from centuries of trade.",
  },
  {
    period: "Arab & Portuguese Influence",
    years: "700s – 1800s",
    color: "bg-orange-100 border-orange-300 text-orange-800",
    dot: "bg-orange-500",
    summary:
      "Arab traders established settlements along the coast, most notably Mombasa, Lamu, and Malindi. The Omani Arabs later controlled much of the coast. Portuguese explorers (Vasco da Gama, 1498) briefly dominated before being expelled. This period shaped the Swahili language deeply — words like 'kitabu' (book) come from Arabic 'kitāb'.",
    swahili_link:
      "Over 30% of Swahili vocabulary traces to Arabic. Words for time, trade, and religion — saa (hour), biashara (commerce), dua (prayer) — all come from this era.",
  },
  {
    period: "British Colonial Period",
    years: "1895 – 1963",
    color: "bg-red-100 border-red-300 text-red-800",
    dot: "bg-red-500",
    summary:
      "Britain declared Kenya a protectorate in 1895 and a Crown Colony in 1920. The construction of the Uganda Railway ('the Lunatic Express') brought South Asian laborers and transformed Kenya's interior. Land dispossession of the Gikuyu and other communities fueled resistance. The Mau Mau uprising (1952-1960) was a pivotal armed struggle for independence.",
    swahili_link:
      "The British used Swahili as an administrative language across East Africa, which accelerated its spread and standardization. Today's standard Swahili is based on the Zanzibar dialect, formalized under colonial linguists.",
  },
  {
    period: "Independence & Uhuru",
    years: "1963",
    color: "bg-green-100 border-green-300 text-green-800",
    dot: "bg-green-500",
    summary:
      "Kenya gained independence on December 12, 1963. Jomo Kenyatta became the first Prime Minister (later President), declaring 'Harambee!' (Let us all pull together!) as the national motto. Swahili was declared an official language alongside English, a symbol of African identity and unity.",
    swahili_link:
      "'Uhuru' means freedom in Swahili. 'Harambee' is a Swahili word for community self-help. Language became an instrument of national pride and identity.",
  },
  {
    period: "Modern Kenya",
    years: "1963 – Present",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    dot: "bg-blue-500",
    summary:
      "Kenya is today East Africa's economic powerhouse, home to Nairobi — a global city and tech hub. The country hosts the African Union, diverse wildlife reserves, and a population of over 55 million people from 42+ ethnic groups. In 2010, a new constitution was enacted. Swahili is an official language of the African Union.",
    swahili_link:
      "Swahili is now spoken by over 200 million people across East and Central Africa. It is one of the official languages of the African Union, Tanzania, Kenya, Uganda, and Rwanda.",
  },
];

const culture = [
  {
    title: "Harambee",
    subtitle: "The Spirit of Community",
    body: "Harambee (Swahili: 'all pull together') is Kenya's founding philosophy of mutual social responsibility and community self-help. Communities build schools, hospitals, and raise funds together. It is the national motto.",
  },
  {
    title: "Ugali",
    subtitle: "The National Dish",
    body: "Ugali — a stiff porridge made from maize flour — is Kenya's staple food. Eaten with sukuma wiki (collard greens), nyama choma (roasted meat), or fish, it appears on virtually every Kenyan table.",
  },
  {
    title: "Maasai Culture",
    subtitle: "Warrior Tradition",
    body: "The Maasai are among Kenya's most recognized peoples. Their beadwork, red shukas (cloth), jumping dances (adumu), and warrior culture (moran) are iconic. Many Maasai words have entered everyday Kenyan speech.",
  },
  {
    title: "Taarab Music",
    subtitle: "Swahili Melody",
    body: "Taarab is a musical genre native to the Swahili coast, blending African, Arab, and Indian influences. Sung in Swahili, it is central to coastal Kenyan and Tanzanian weddings and celebrations.",
  },
  {
    title: "Lamu Old Town",
    subtitle: "UNESCO World Heritage Site",
    body: "Lamu is the oldest living Swahili settlement in East Africa, founded in the 12th century. Its coral stone architecture, donkey-filled streets, and Swahili culture are preserved and celebrated.",
  },
  {
    title: "Swahili Proverbs",
    subtitle: "Methali za Kiswahili",
    body: "Proverbs are central to Swahili oral tradition. 'Haba na haba hujaza kibaba' (Little by little fills the measure) teaches patience. 'Elimu ni ufunguo wa maisha' (Education is the key to life) is perhaps the most famous.",
  },
];

export default function HistoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-14 text-center">
        <span className="inline-block bg-[var(--secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Kenya & Culture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          History, Heritage & Heart
        </h1>
        <p className="text-[var(--foreground)]/60 max-w-2xl mx-auto text-lg">
          Swahili is not just a language — it is the living voice of East African history.
          Understanding Kenya's past deepens every word you learn.
        </p>
      </div>

      {/* Timeline */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8">A Timeline of Kenya</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--border)]" />
          <div className="flex flex-col gap-8">
            {eras.map((era) => (
              <div key={era.period} className="relative flex gap-6">
                {/* Dot */}
                <div
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${era.dot} shadow-md`}
                />
                {/* Card */}
                <div className={`flex-1 border rounded-2xl p-6 ${era.color}`}>
                  <div className="text-xs font-semibold mb-1 opacity-70">{era.years}</div>
                  <h3 className="text-xl font-bold mb-3">{era.period}</h3>
                  <p className="text-sm leading-relaxed mb-4 opacity-80">{era.summary}</p>
                  <div className="bg-white/60 rounded-xl p-3 border border-current/20">
                    <span className="font-semibold text-xs block mb-1">
                      🗣 Swahili connection:
                    </span>
                    <p className="text-xs leading-relaxed opacity-80">{era.swahili_link}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Culture & Traditions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {culture.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-[var(--border)] rounded-2xl p-6 card-hover"
            >
              <h3 className="font-bold text-lg mb-0.5">{c.title}</h3>
              <p className="text-xs text-[var(--secondary)] font-semibold mb-3">{c.subtitle}</p>
              <p className="text-[var(--foreground)]/60 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 bg-[var(--primary)] text-white rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">
          Ready to bring this history to life?
        </h3>
        <p className="text-white/70 mb-6">
          Every lesson connects language to culture. Start with Module 1.
        </p>
        <a
          href="/courses"
          className="inline-flex items-center gap-2 bg-white text-[var(--primary)] font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
        >
          Go to Courses <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
