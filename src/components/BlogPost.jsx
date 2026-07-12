import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { blogPosts } from '../posts/posts-meta';
import { pushPath } from '../utils/history';
import { fadeInUp } from '../utils/animations';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const BlogPost = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (!post) return;

        // --- Dynamic Client-Side SEO Updates ---
        const oldTitle = document.title;
        document.title = `${post.title} | Muhammad Hamza`;

        const metaDesc = document.querySelector('meta[name="description"]');
        let oldDesc = '';
        if (metaDesc) {
            oldDesc = metaDesc.getAttribute('content') || '';
            metaDesc.setAttribute('content', post.excerpt);
        }

        // Add dynamic JSON-LD
        const scriptId = `jsonld-blogposting-${post.slug}`;
        let script = document.getElementById(scriptId);
        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "author": { 
                    "@type": "Person", 
                    "name": "Muhammad Hamza", 
                    "url": "https://hamzax.me" 
                },
                "datePublished": post.date,
                "image": post.coverImage ? `https://hamzax.me${post.coverImage}` : "https://hamzax.me/images/muhammad-hamza-profile.jpg",
                "publisher": { 
                    "@type": "Person", 
                    "name": "Muhammad Hamza" 
                },
                "description": post.excerpt
            });
            document.head.appendChild(script);
        }

        return () => {
            // Restore SEO defaults
            document.title = oldTitle;
            if (metaDesc) metaDesc.setAttribute('content', oldDesc);
            
            // Remove schema script
            const currentScript = document.getElementById(scriptId);
            if (currentScript) {
                currentScript.remove();
            }
        };
    }, [post]);

    if (!post) {
        return (
            <section className="py-24 px-4 min-h-screen flex items-center justify-center">
                <div className="text-center glass p-8 rounded-xl max-w-md">
                    <h2 className="text-2xl font-bold text-primary mb-4">Post Not Found</h2>
                    <p className="text-secondary mb-6">The article you are looking for does not exist.</p>
                    <a
                        href="/blog"
                        onClick={(e) => { e.preventDefault(); pushPath('/blog'); }}
                        className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium inline-block"
                    >
                        Back to Blog
                    </a>
                </div>
            </section>
        );
    }

    const handleBack = (e) => {
        e.preventDefault();
        pushPath('/blog');
        window.scrollTo(0, 0);
    };

    // Configure marked options
    const rawHtml = marked(post.content);

    return (
        <section id="blog-post" className="py-24 px-4 sm:px-6 lg:px-8 bg-main min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Back */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="mb-8"
                >
                    <a
                        href="/blog"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface/50 backdrop-blur-md border border-card-border/40 text-secondary hover:text-brand-500 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-500/10 group text-sm"
                    >
                        <HiOutlineArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Blog
                    </a>
                </motion.div>

                {/* Main Article Card */}
                <motion.article
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="glass rounded-3xl overflow-hidden shadow-2xl border border-card-border/30 mb-12"
                >
                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="relative w-full h-[220px] sm:h-[380px] overflow-hidden border-b border-card-border/20">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                        </div>
                    )}

                    {/* Article Body Container */}
                    <div className="p-6 sm:p-12">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-full font-bold uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-secondary/60 font-medium mb-8 pb-6 border-b border-card-border/20">
                            <div className="flex items-center gap-2">
                                <span>Published:</span>
                                <span className="text-primary font-semibold">{post.date}</span>
                            </div>
                            <span className="hidden sm:inline text-secondary/30">•</span>
                            <div className="flex items-center gap-2">
                                <span>Read Time:</span>
                                <span className="text-primary font-semibold">{post.readTime}</span>
                            </div>
                            <span className="hidden sm:inline text-secondary/30">•</span>
                            <div className="flex items-center gap-2">
                                <span>Author:</span>
                                <span className="text-brand-500 font-bold">Muhammad Hamza</span>
                            </div>
                        </div>

                        {/* Rendered Markdown Area */}
                        <div
                            className="prose dark:prose-invert max-w-none prose-brand text-secondary/90 leading-relaxed space-y-6 
                            prose-headings:text-primary prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                            prose-h2:text-2xl prose-h2:text-brand-500/90 prose-h2:border-l-4 prose-h2:border-brand-500 prose-h2:pl-3 prose-h2:mt-10
                            prose-h3:text-xl
                            prose-p:text-base prose-p:leading-relaxed
                            prose-a:text-brand-500 prose-a:font-semibold hover:prose-a:underline
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:my-4
                            prose-li:text-secondary/95 prose-li:my-1
                            prose-code:text-brand-500 prose-code:bg-brand-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-strong:text-brand-500 prose-strong:font-bold"
                            dangerouslySetInnerHTML={{ __html: rawHtml }}
                        />
                    </div>
                </motion.article>

                {/* Author Bio Box */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="glass p-6 sm:p-8 rounded-3xl border border-brand-500/10 flex flex-col sm:flex-row items-center sm:items-start gap-6"
                >
                    {/* Tiny Avatar */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-brand-500/20 flex-shrink-0">
                        <img
                            src="/images/muhammad-hamza-profile.jpg"
                            alt="Muhammad Hamza"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Bio Copy */}
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-2">About the Author</h3>
                        <p className="text-secondary text-sm mb-4 leading-relaxed">
                            Muhammad Hamza is a Software Engineer based in Peshawar, Pakistan, and the Main Developer of Quizior. He specializes in Python/FastAPI, web scrapers, and intelligent AI systems.
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs font-semibold text-brand-500">
                            <a href="https://www.linkedin.com/in/muhammad-hamza-deve" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                            <a href="https://github.com/muhammad-hamzadev" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                            <a href="https://x.com/i_hamza_06" target="_blank" rel="noopener noreferrer" className="hover:underline">X (Twitter)</a>
                            <a href="https://www.instagram.com/muhammadhamzadev" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                            <a href="https://hamzax.me" className="hover:underline">Portfolio</a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPost;
