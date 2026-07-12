import { motion } from 'framer-motion';
import { blogPosts } from '../posts/posts-meta';
import { pushPath } from '../utils/history';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { useTheme } from '../contexts/ThemeContext';

const BlogList = () => {
    const { theme } = useTheme();
    const isLight = theme !== 'dark';

    const handleNavigate = (e, slug) => {
        e.preventDefault();
        pushPath(`/blog/${slug}`);
        window.scrollTo(0, 0);
    };

    return (
        <section id="blog-list" className="py-24 px-4 sm:px-6 lg:px-8 bg-main min-h-screen relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 -translate-y-12 ${
                isLight ? 'bg-brand-500/15' : 'bg-brand-500/8'
            }`}></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Glass Banner */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="glass p-6 sm:p-8 rounded-2xl text-center mb-10 border border-card-border/30 max-w-2xl mx-auto relative overflow-hidden"
                >
                    {/* Inner light source */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at center, rgba(35, 155, 143, ${isLight ? '0.12' : '0.06'}) 0%, transparent 80%)`
                        }}
                    ></div>

                    <div className="relative z-10">
                        {/* Little Pill Badge */}
                        <span className="inline-block px-3.5 py-0.5 text-[10px] font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-full tracking-widest uppercase mb-3">
                            Insights & Articles
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 leading-tight">
                            Muhammad Hamza's <span className="text-brand-500">Blog</span>
                        </h1>
                        <p className="text-secondary/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Thoughts on scalable backends, multi-agent AI architectures, testing workflows, and engineering products with impact.
                        </p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                {blogPosts.length === 0 ? (
                    <div className="text-center py-16 glass rounded-2xl max-w-lg mx-auto border border-card-border/30">
                        <p className="text-secondary text-lg">No posts published yet. Check back soon!</p>
                    </div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {blogPosts.map((post) => (
                            <motion.article
                                key={post.slug}
                                variants={staggerItem}
                                className="glass rounded-2xl overflow-hidden hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group flex flex-col h-full border border-card-border/30"
                            >
                                {/* Cover Image */}
                                {post.coverImage && (
                                    <div className="relative h-44 overflow-hidden border-b border-card-border/20">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                                    </div>
                                )}

                                {/* Card Body */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Date & Read Time */}
                                    <div className="flex items-center gap-3 text-xs text-secondary/60 font-semibold mb-3">
                                        <span>{post.date}</span>
                                        <span className="text-secondary/30">•</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-primary mb-2 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                                        <a href={`/blog/${post.slug}`} onClick={(e) => handleNavigate(e, post.slug)}>
                                            {post.title}
                                        </a>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-secondary/80 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                                        {post.excerpt}
                                    </p>

                                    {/* Footer Tags & Link */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4 border-t border-card-border/20">
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-[10px] bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-full font-bold uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            onClick={(e) => handleNavigate(e, post.slug)}
                                            className="text-xs font-bold text-brand-500 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1"
                                        >
                                            Read More &rarr;
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BlogList;
