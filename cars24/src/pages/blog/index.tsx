import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, MessageSquare, Calendar } from "lucide-react";

export const featuredArticles = [
  {
    id: 1,
    title: "Tata Altroz facelift clear images leaked ahead of launch",
    summary: "See the first all-clear images of the new Altroz facelift. It shows an updated front grille, sharper LED headlights, and new alloy wheels.",
    author: "Eddie Summerson",
    date: "1 week ago",
    comments: 5,
    image: "https://images.pexels.com/photos/2056220/pexels-photo-2056220.jpeg",
  },
  {
    id: 2,
    title: "Discounts on Volkswagen cars — Save up to ₹ 2.50 lakh",
    summary: "Top deals and discounts on Volkswagen models this month. Learn how you can save on Taigun and Virtus.",
    author: "Samantha Bridges",
    date: "3 days ago",
    comments: 8,
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
  },
  {
    id: 3,
    title: "Honda car Check out new arrivals for 2025",
    summary: "Check out the latest Honda models hitting the market. A look at the next-generation Amaze and updated City.",
    author: "Michael Scott",
    date: "5 days ago",
    comments: 3,
    image: "https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg",
  },
  {
    id: 4,
    title: "Toyota to launch 3 new EVs by the end of 2025",
    summary: "Toyota accelerates its electric vehicle lineup expansion. New electric SUVs and sedans are in the pipeline.",
    author: "Jennifer Lee",
    date: "2 days ago",
    comments: 12,
    image: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg",
  },
  {
    id: 5,
    title: "Mahindra XUV700 gets new features and variant updates",
    summary: "Explore the new features added to the popular XUV700. Mahindra introduces captain seats and a ventilated setup.",
    author: "Rajesh Kumar",
    date: "6 days ago",
    comments: 9,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
  },
];

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span>Cars24 Newsroom</span>
            </h1>
            <p className="text-sm text-gray-500">Stay updated with the latest automotive releases, deals, and insights.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="relative h-48 w-full">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white/85 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed flex-grow">
                  {article.summary}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center justify-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-colors"
                  >
                    Read full article
                  </Link>
                </div>
                <div className="flex items-center text-[10px] text-gray-500 border-t border-gray-100 pt-3">
                  <div className="h-5 w-5 rounded-full bg-gray-200 mr-2 flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/24?u=${article.id}`}
                      alt={article.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-700">{article.author}</span>
                  <span className="mx-1.5">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </span>
                  <span className="mx-1.5">•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{article.comments}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
