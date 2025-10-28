import { Mail, MessageCircle, Phone, MapPin } from "lucide-react"

export default function GetInTouch() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">{"We're here to assist you with your inquiries."}</p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Email Card */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-12 h-12 text-slate-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-lime-500 mb-4">Email</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">Reach out to us anytime for support or questions.</p>
            <p className="text-gray-800 font-medium">support@healthcompany.com</p>
          </div>
        </div>

        {/* Live Chat Card */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-slate-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-lime-500 mb-4">Live Chat</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">Chat with our team for immediate assistance.</p>
            <p className="text-gray-800 font-medium">Start Chat Now</p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-12 h-12 text-slate-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-lime-500 mb-4">Phone</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">Call us for quick answers and support.</p>
            <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Office Card */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-slate-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-lime-500 mb-4">Office</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">Visit us for in-person consultations and support.</p>
            <p className="text-gray-800 font-medium">456 Health Ave, Sydney NSW 2000 AU</p>
          </div>
        </div>
      </div>
    </div>
  )
}
