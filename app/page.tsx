import Link from 'next/link'
import { ArrowRight, Users, Clock, CircleCheck as CheckCircle, Monitor, ChartBar as BarChart3, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xs">Q</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">QueueBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              How it works
            </Link>
            <Link href="/admin" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Admin
            </Link>
          </div>

          <Link
            href="/citizen"
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left - Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Queue Management System
              </div>

              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                Stop the chaos in your waiting room.
              </h1>

              <p className="text-lg text-neutral-500 max-w-lg leading-relaxed">
                A minimal, powerful queue management system for offices and healthcare facilities.
                Real-time tracking, instant notifications, zero friction.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors group"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-neutral-600 font-medium hover:text-neutral-900 transition-colors"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free tier available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-4 bg-neutral-50 rounded-2xl" />
              <div className="relative bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Live Stats</span>
                  <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm text-neutral-500">Currently serving</span>
                      <span className="text-4xl font-semibold tracking-tight">A-047</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Waiting</p>
                      <p className="text-2xl font-semibold">12</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Avg Wait</p>
                      <p className="text-2xl font-semibold">8<span className="text-sm font-normal text-neutral-400">m</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Served</p>
                      <p className="text-2xl font-semibold">47</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-neutral-100 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-medium text-neutral-400 uppercase tracking-widest mb-6">
            Trusted by modern offices
          </p>
          <div className="flex items-center justify-center gap-12 md:gap-16">
            {['City Health', 'Metro Services', 'QuickCare', 'OfficeHub', 'FastTrack'].map((brand) => (
              <span key={brand} className="text-sm font-medium text-neutral-300 hover:text-neutral-500 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Simple tools that work together seamlessly. No bloat, no learning curve.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-neutral-900 text-white rounded-2xl p-8 md:p-10 group-hover:bg-neutral-800 transition-colors min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Display Board
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                  Put up a display. Done.
                </h3>
                <p className="text-neutral-400 max-w-md leading-relaxed">
                  A beautiful, auto-updating display board for your waiting area.
                  Shows who's being served, estimated wait times, and keeps everyone informed.
                </p>
              </div>
              <Link
                href="/admin/display-board"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors group mt-6"
              >
                View Display Board
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 uppercase tracking-wider mb-6">
                  <Users className="w-3.5 h-3.5" />
                  Booking
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-3">
                  Simple booking flow
                </h3>
                <p className="text-emerald-700/70 text-sm leading-relaxed">
                  Citizens book in under a minute. Get a unique token, track position in real-time.
                </p>
              </div>
              <Link
                href="/citizen"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors group mt-6"
              >
                Try booking
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  Real-time
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Instant updates
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  WebSocket-powered live tracking. Know immediately when it's your turn.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  ETA Estimates
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Accurate wait times
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Smart algorithms calculate wait times based on actual service duration.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  Secure
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Data safe
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  End-to-end encryption, secure tokens, and privacy-first design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4 block">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Three steps to an organized queue
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Get started in minutes. No complex setup, no training required.
                Your staff and citizens will thank you.
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Set up your office', desc: 'Add services, time slots, and counters in the admin dashboard.' },
                  { step: '02', title: 'Share the booking link', desc: 'Citizens can book online or walk-in and get a token instantly.' },
                  { step: '03', title: 'Manage the queue', desc: 'Call next, mark complete, view analytics. Rinse, repeat.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-xs font-mono text-neutral-300">{item.step}</span>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 relative overflow-hidden">
                {/* Abstract queue visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full p-8">
                    {/* Queue line */}
                    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                      <path
                        d="M 20 100 Q 100 20 180 100"
                        stroke="#e5e5e5"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      {/* Dots representing people in queue */}
                      {[
                        { x: 30, y: 85, size: 12, status: 'serving' },
                        { x: 60, y: 50, size: 10, status: 'waiting' },
                        { x: 100, y: 35, size: 10, status: 'waiting' },
                        { x: 140, y: 55, size: 10, status: 'waiting' },
                        { x: 170, y: 95, size: 8, status: 'waiting' },
                      ].map((dot, i) => (
                        <circle
                          key={i}
                          cx={dot.x}
                          cy={dot.y}
                          r={dot.size}
                          fill={dot.status === 'serving' ? '#171717' : '#d4d4d4'}
                        />
                      ))}
                    </svg>

                    {/* Label */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Queue flow visualization</span>
                        <span className="text-emerald-500 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Analytics Card */}
            <div className="order-2 lg:order-1">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-medium">Daily Analytics</h4>
                  <span className="text-xs text-neutral-400">Jan 27, 2026</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">Completion rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-900 rounded-full w-[87%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">No-show rate</span>
                      <span className="font-medium text-rose-500">8%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[8%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Peak Hour</p>
                      <p className="text-xl font-semibold">14:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Avg Wait</p>
                      <p className="text-xl font-semibold">12 <span className="text-sm font-normal text-neutral-400">min</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Understand your operations
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Built-in analytics help you understand peak hours, track average wait times,
                and identify opportunities to improve efficiency.
              </p>
              <ul className="space-y-3">
                {[
                  'Identify peak hours for better staffing',
                  'Track real-time wait vs. service goals',
                  'Monitor and reduce no-show rates',
                  'Export reports for management review',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Ready to streamline your queue?
          </h2>
          <p className="text-neutral-400 mb-10 max-w-lg mx-auto">
            Start managing your queue in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 font-medium rounded-md hover:bg-neutral-100 transition-colors group"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/citizen"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-neutral-300 font-medium hover:text-white transition-colors"
            >
              Try booking flow
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Q</span>
                </div>
                <span className="font-semibold text-neutral-900">QueueBridge</span>
              </Link>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                Modern queue management for offices and healthcare facilities.
                Built with Next.js and PostgreSQL.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/citizen" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Citizen Booking</Link></li>
                <li><Link href="/admin" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/admin/display-board" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Display Board</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Stack</h4>
              <ul className="space-y-2">
                <li><span className="text-sm text-neutral-600">Next.js 16</span></li>
                <li><span className="text-sm text-neutral-600">PostgreSQL</span></li>
                <li><span className="text-sm text-neutral-600">Redis</span></li>
                <li><span className="text-sm text-neutral-600">Tailwind CSS</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">2026 QueueBridge</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">Privacy</Link>
              <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
