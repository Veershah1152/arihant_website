import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./feature-steps.css"

export function FeatureSteps({
    features,
    className = "",
    title = "How to get Started",
    autoPlayInterval = 3000,
}) {
    const [currentFeature, setCurrentFeature] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < 100) {
                setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
            } else {
                setCurrentFeature((prev) => (prev + 1) % features.length)
                setProgress(0)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [progress, features.length, autoPlayInterval])

    return (
        <div className={`feature-steps ${className}`}>
            <div className="feature-steps__container">
                <h2 className="feature-steps__title">{title}</h2>

                <div className="feature-steps__grid">
                    <div className="feature-steps__list">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={`feature-step ${index === currentFeature ? 'feature-step--active' : 'feature-step--inactive'}`}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: index === currentFeature ? 1 : 0.4 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="feature-step__number">
                                    {index <= currentFeature ? "✓" : index + 1}
                                </div>

                                <div className="feature-step__content">
                                    <h3 className="feature-step__title">
                                        {feature.title || feature.step}
                                    </h3>
                                    <p className="feature-step__description">
                                        {feature.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="feature-steps__image-container">
                        <AnimatePresence mode="wait">
                            {features.map(
                                (feature, index) =>
                                    index === currentFeature && (
                                        <motion.img
                                            key={index}
                                            src={feature.image}
                                            alt={feature.step}
                                            className="feature-steps__image feature-steps__image--active"
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -100, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        />
                                    ),
                            )}
                        </AnimatePresence>
                        <div className="feature-steps__image-overlay" />
                    </div>
                </div>
            </div>
        </div>
    )
}
