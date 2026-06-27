import Link from 'next/link'
import { ArrowRight, BarChart3, Users, Clock, Play, CheckCircle, Smartphone, LayoutDashboard, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-100 to-blue-50 text-slate-900 selection:bg-purple-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">QueueBridge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Features</Link>
            <Link href="#solution" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">How it works</Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Customers</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hidden sm:block text-slate-600 hover:text-purple-600 font-medium transition-colors">
              Admin Login
            </Link>
            <Link
              href="/citizen"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Queue Management System 1.0 is Live</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-center text-slate-900 mb-6 leading-tight tracking-tight">
            Streamline your waiting room <br className="hidden md:block" />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">QueueBridge.</span>
          </h1>

          {/* Subheading */}
          <p className="text-center text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A modern, full-stack queue management system designed for offices and healthcare facilities. Track queue positions in real-time and provide powerful analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/admin"
              className="px-8 py-3.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-purple-500/5 rounded-3xl transform rotate-1 scale-105 filter blur-2xl opacity-50"></div>
            <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-slate-100 p-2 relative overflow-hidden ring-1 ring-slate-900/5">
              {/* Browser Header */}
              <div className="bg-slate-50 border-b border-slate-100 rounded-t-xl px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-white border border-slate-200 rounded-md px-24 py-1 text-xs text-slate-400 font-medium">queuebridge.app/admin</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-slate-50 rounded-b-xl">
                {/* Left Sidebar Mock */}
                <div className="hidden md:block col-span-1 bg-white border-r border-slate-100 p-6 min-h-[400px]">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded"></div>
                    <span className="font-bold text-slate-800">QueueBridge</span>
                  </div>
                  <div className="space-y-2">
                    {['Dashboard', 'Queue Management', 'Display Board', 'Analytics', 'Settings'].map((item, i) => (
                      <div key={item} className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${i === 1 ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Mock */}
                <div className="col-span-1 md:col-span-3 p-6 md:p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Queue Management</h3>
                      <p className="text-sm text-slate-500">Manage today's appointments and walk-ins.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">Today</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-4 h-4" /></div>
                        <p className="text-slate-500 text-sm font-medium">Waiting</p>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">12</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                        <p className="text-slate-500 text-sm font-medium">Avg. Wait</p>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">8m</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-4 h-4" /></div>
                        <p className="text-slate-500 text-sm font-medium">Served</p>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">45</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                      <h4 className="font-semibold text-slate-800">Current Queue</h4>
                    </div>
                    <div className="p-0">
                      {[
                        { token: 'A-047', name: 'John D.', status: 'Serving', time: '10:30 AM' },
                        { token: 'A-048', name: 'Sarah M.', status: 'Waiting', time: '10:45 AM' },
                        { token: 'B-012', name: 'Walk-in', status: 'Waiting', time: '10:50 AM' },
                      ].map((row, i) => (
                        <div key={i} className={`flex items-center justify-between px-6 py-4 border-b border-slate-50 ${i === 0 ? 'bg-purple-50/30' : ''}`}>
                          <div className="flex items-center gap-4">
                            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{row.token}</span>
                            <span className="font-medium text-slate-700">{row.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500">{row.time}</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.status === 'Serving' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Trusted by modern offices and facilities</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['MediCare Plus', 'City Services', 'TechRepair', 'Global Visa', 'Prime Health'].map((brand) => (
              <div key={brand} className="text-slate-800 font-bold text-xl">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to manage your queue
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              QueueBridge provides a comprehensive suite of tools built on Next.js and PostgreSQL to handle appointments seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#ECFDF5] rounded-2xl overflow-hidden relative group min-h-[320px]">
              <div className="absolute right-0 inset-y-0 w-1/2 flex flex-col justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-48 h-32 bg-gradient-to-br from-emerald-300 to-teal-200 rounded-l-full translate-x-12 mb-2"></div>
                <div className="w-48 h-32 bg-gradient-to-br from-teal-200 to-emerald-300 rounded-l-full translate-x-8"></div>
              </div>
              <div className="p-8 relative z-10 h-full flex flex-col items-start">
                <div className="bg-white/80 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 flex items-center gap-2 mb-12 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Citizen Flow
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-3 tracking-tight">Booking App</h3>
                <p className="text-slate-700 max-w-xs mb-8">
                  A seamless multi-step form for citizens to book appointments, select time slots, and receive a unique tracking token instantly.
                </p>
                <Link href="/citizen" className="mt-auto font-medium text-slate-900 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  Try booking <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#EFF6FF] rounded-2xl overflow-hidden relative group min-h-[320px]">
              <div className="absolute right-0 inset-y-0 w-1/2 flex items-center justify-end opacity-80 group-hover:opacity-100 transition-opacity -mr-8">
                <div className="w-64 h-64 bg-gradient-to-br from-sky-300 to-indigo-200 rounded-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
                  <div className="bg-[#EFF6FF] rounded-tl-full"></div>
                  <div className="bg-[#EFF6FF] rounded-tr-full"></div>
                  <div className="bg-[#EFF6FF] rounded-bl-full"></div>
                  <div className="bg-[#EFF6FF] rounded-br-full"></div>
                </div>
              </div>
              <div className="p-8 relative z-10 h-full flex flex-col items-start">
                <div className="bg-white/80 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 flex items-center gap-2 mb-12 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  Real-time
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-3 tracking-tight">Live Tracking</h3>
                <p className="text-slate-700 max-w-xs mb-8">
                  Powered by Redis caching, customers get live updates on their queue position and estimated wait times right on their device.
                </p>
                <Link href="#features" className="mt-auto font-medium text-slate-900 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f1e6f7] rounded-2xl overflow-hidden relative group min-h-[320px] md:col-span-2">
              <div className="absolute right-0 inset-y-0 w-1/3 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-64 h-64 bg-gradient-to-tr from-purple-300 to-purple-200 rounded-full flex items-center justify-center translate-x-12">
                   <div className="w-32 h-32 bg-[#FFF7ED] rounded-full shadow-inner"></div>
                </div>
              </div>
              <div className="p-8 relative z-10 h-full flex flex-col items-start">
                <div className="bg-white/80 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 flex items-center gap-2 mb-12 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Admin Tools
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-3 tracking-tight">Display Board & Admin</h3>
                <p className="text-slate-700 max-w-md mb-8">
                  Manage the active queue, call the next customer, and project a beautiful Display Board in your waiting area to keep everyone informed.
                </p>
                <Link href="/admin" className="mt-auto font-medium text-slate-900 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  Open dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section id="solution" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-3xl transform -rotate-3 scale-105"></div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative">
                <h4 className="font-bold text-slate-900 mb-6 text-lg border-b border-slate-100 pb-4">Daily Analytics Engine</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">Completed Appointments</span>
                      <span className="text-purple-600 font-bold">85%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">No-show Rate</span>
                      <span className="text-rose-500 font-bold">12%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[12%]"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Peak Hour</p>
                      <p className="text-xl font-bold text-slate-900">14:00 - 15:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Avg Wait</p>
                      <p className="text-xl font-bold text-slate-900">12.5 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-6 border border-purple-100">
                <BarChart3 className="w-4 h-4" />
                Data-Driven Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Understand your operations with powerful analytics
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                QueueBridge doesn't just manage your line—it analyzes it. Our built-in analytics engine aggregates data daily to help you understand peak hours, track average wait times, and reduce no-show rates.
              </p>
              <ul className="space-y-4">
                {[
                  'Identify peak hours to optimize staff scheduling',
                  'Track real-time wait times against your service goals',
                  'Monitor no-show rates to adjust booking policies',
                  'Export comprehensive reports for management review'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-purple-100 p-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 mix-blend-multiply"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to upgrade your waiting experience?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join modern offices using QueueBridge to reduce wait times and improve customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/citizen"
              className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Experience Booking Flow
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold text-slate-900">QueueBridge</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed pr-4">
                A modern, full-stack queue management system built with Next.js, PostgreSQL, and Redis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/citizen" className="text-slate-500 hover:text-purple-600 transition-colors">Citizen Booking</Link></li>
                <li><Link href="/admin" className="text-slate-500 hover:text-purple-600 transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/admin/display-board" className="text-slate-500 hover:text-purple-600 transition-colors">Display Board</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Technology</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Next.js 16</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">PostgreSQL (Neon)</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Redis (Upstash)</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Tailwind CSS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-purple-600 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 QueueBridge.</p>
            
          </div>
        </div>
      </footer>
    </main>
  )
}
