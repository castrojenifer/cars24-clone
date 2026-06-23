import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, User, Calendar, MessageSquare, Send, CheckCircle } from "lucide-react";

const articlesDatabase = [
  {
    id: 1,
    title: "Tata Altroz facelift clear images leaked ahead of launch",
    summary: "See the first all-clear images of the new Altroz facelift. It shows an updated front grille, sharper LED headlights, and new alloy wheels.",
    content: "The Tata Altroz facelift has been spotted testing multiple times, and now the latest clear images have leaked ahead of its official launch. The premium hatchback receives significant cosmetic updates, including a revised front fascia with a sleeker grille, redesigned bumpers, and sharper projector headlamps with LED DRLs. On the sides, it sports newly designed alloy wheels, while the rear gets updated LED taillights connected by a black trim. Inside, the cabin is expected to get a larger 10.25-inch infotainment system, a digital instrument cluster, ventilated seats, and potentially a sunroof to keep it competitive against the Hyundai i20 and Maruti Baleno.",
    author: "Eddie Summerson",
    date: "1 week ago",
    image: "https://images.pexels.com/photos/2056220/pexels-photo-2056220.jpeg",
  },
  {
    id: 2,
    title: "Discounts on Volkswagen cars — Save up to ₹ 2.50 lakh",
    summary: "Top deals and discounts on Volkswagen models this month. Learn how you can save on Taigun and Virtus.",
    content: "Volkswagen India has announced massive benefits and discounts on its popular models, the Taigun SUV and the Virtus sedan, for this month. Buyers can save up to ₹ 2.50 lakh depending on the variant and region. These benefits include direct cash discounts, exchange bonuses, loyalty programs, and special corporate offers. The flagship Virtus GT Line and Taigun GT Edge editions receive the highest share of benefits. This move comes as Volkswagen seeks to clear inventory and attract buyers amidst increasing competition in the mid-size segment.",
    author: "Samantha Bridges",
    date: "3 days ago",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
  },
  {
    id: 3,
    title: "Honda car Check out new arrivals for 2025",
    summary: "Check out the latest Honda models hitting the market. A look at the next-generation Amaze and updated City.",
    content: "Honda is preparing a strong lineup for the upcoming model year, focusing heavily on hybrid powertrains and updated safety suites. The next-generation Honda Amaze is scheduled for a complete design overhaul with inspiration drawn from the Accord. Meanwhile, the Honda City hybrid sees price adjustments and additional standard features, making self-charging hybrid technology more accessible to buyers. Additionally, Honda is expected to preview its upcoming mid-size electric SUV designed specifically for developing markets.",
    author: "Michael Scott",
    date: "5 days ago",
    image: "https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg",
  },
  {
    id: 4,
    title: "Toyota to launch 3 new EVs by the end of 2025",
    summary: "Toyota accelerates its electric vehicle lineup expansion. New electric SUVs and sedans are in the pipeline.",
    content: "Toyota Motor Corporation has revealed plans to accelerate its global battery electric vehicle (BEV) rollout by introducing three brand-new electric models by the end of 2025. These will include a mid-size family SUV, a compact city crossover, and a premium electric sedan. This marks a strategic shift for the automaker, which has historically prioritized hybrid vehicles, as global demand for pure electric powertrains continues to rise.",
    author: "Jennifer Lee",
    date: "2 days ago",
    image: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg",
  },
  {
    id: 5,
    title: "Mahindra XUV700 gets new features and variant updates",
    summary: "Explore the new features added to the popular XUV700. Mahindra introduces captain seats and a ventilated setup.",
    content: "Mahindra & Mahindra has refreshed the variant lineup of the highly popular XUV700, introducing captain seats in the middle row for the 6-seater variant, ventilated front seats, and an auto-dimming inside rearview mirror (IRVM). The infotainment system also receives firmware updates to support new connectivity features and smoother navigation transitions. Prices remain competitive, ensuring the XUV700 remains the benchmark in its segment.",
    author: "Rajesh Kumar",
    date: "6 days ago",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
  },
];

export default function BlogDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (!id) return;
    const matchId = parseInt(id as string, 10);
    const matched = articlesDatabase.find((a) => a.id === matchId);
    setArticle(matched || articlesDatabase[0]);

    // Load local comments
    const storageKey = `cars24_blog_comments_${id}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      // Seed default comments
      const defaultComments = [
        { name: "John Miller", text: "Exciting update! Looking forward to the official launch.", date: "1 day ago" },
        { name: "Sarah Connor", text: "Nice review. Appreciate the detailed specs.", date: "12 hours ago" },
      ];
      setComments(defaultComments);
      localStorage.setItem(storageKey, JSON.stringify(defaultComments));
    }
  }, [id]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !commentInput.trim()) return;

    const newComment = {
      name: nameInput,
      text: commentInput,
      date: "Just now",
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`cars24_blog_comments_${id}`, JSON.stringify(updated));

    setNameInput("");
    setCommentInput("");
  };

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-md shadow-sm transition-colors text-gray-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            {article.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/24?u=${article.id}`}
                  alt={article.author}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-800">{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Image */}
          <div className="h-80 md:h-[400px] w-full overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            <p className="font-medium text-gray-800">{article.summary}</p>
            <p className="whitespace-pre-line">{article.content}</p>
          </div>

          {/* Verification Badge */}
          <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3 border border-green-100">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-green-950">Verified Automotive Insights</p>
              <p className="text-[10px] text-green-800 mt-0.5">This article has been vetted by our expert editorial board for accuracy and verified facts.</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-100 pt-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>Comments ({comments.length})</span>
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handlePostComment} className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Write your comment..."
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute bottom-2.5 right-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((cmt, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-800">{cmt.name}</span>
                    <span className="text-[10px] text-gray-400">{cmt.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{cmt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
