import { Palette, Layers, Zap, Download, Cloud, User, CheckCircle } from 'lucide-react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
    return (
        <div className="welcome-screen">
            <div className="welcome-bg"></div>

            <div className="welcome-wrapper">
                {/* Header Section */}
                <header className="welcome-header animate-drop-1">
                    <div className="logo-badge">
                        <svg width="50" height="50" viewBox="0 0 80 80">
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="100%" stopColor="#764ba2" />
                                </linearGradient>
                            </defs>
                            <path d="M20 40 L40 20 L60 40 L40 60 Z M40 10 L70 40 L40 70 L10 40 Z" fill="url(#logoGradient)" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="app-title">Vector<span className="text-gradient">Craft</span></h1>
                        <p className="app-subtitle">The Ultimate Web-Based Vector Design Studio</p>
                    </div>
                </header>

                <main className="welcome-main">
                    {/* Primary Action */}
                    <div className="hero-action animate-drop-2">
                        <button className="btn-primary-lg" onClick={onStart}>
                            <Zap size={24} fill="currentColor" />
                            <span>Start Designing Now</span>
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="content-grid animate-drop-3">

                        {/* Profile Card */}
                        <div className="info-card profile-card">
                            <div className="card-header">
                                <div className="avatar-circle">
                                    <User size={32} />
                                </div>
                                <div className="header-text">
                                    <h3>Abhishek Keshao Parekar</h3>
                                    <span className="role-tag">Full Stack Developer</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>
                                    Passionate <strong>Full Stack Developer</strong> with <strong>1.6+ years</strong> of experience building scalable web apps. Expert in creating clean, performance-driven solutions with modern technologies.
                                </p>
                                <p className="mt-2">
                                    Quick learner, detail-oriented, and focused on delivering impactful user experiences through logical problem solving.
                                </p>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="info-card features-card">
                            <div className="card-header">
                                <div className="icon-circle">
                                    <Layers size={24} />
                                </div>
                                <h3>Power Features</h3>
                            </div>
                            <div className="features-list">
                                <div className="feature-row">
                                    <CheckCircle size={18} className="check-icon" />
                                    <span>Professional Vector Tools</span>
                                </div>
                                <div className="feature-row">
                                    <CheckCircle size={18} className="check-icon" />
                                    <span>Smart Layer Management</span>
                                </div>
                                <div className="feature-row">
                                    <CheckCircle size={18} className="check-icon" />
                                    <span>Export to SVG, PNG, PDF & Word</span>
                                </div>
                                <div className="feature-row">
                                    <CheckCircle size={18} className="check-icon" />
                                    <span>Real-time Local Saving</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="welcome-footer animate-drop-4">
                    <p>© 2026 VectorCraft • Developed by Abhishek Keshao Parekar</p>
                </footer>
            </div>
        </div>
    );
}

export default WelcomeScreen;
