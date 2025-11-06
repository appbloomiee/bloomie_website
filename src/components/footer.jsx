const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 font-bold text-xl mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <img src="/Asset/logo.svg" alt="" />
                </div>
                <span>Bloomie AI</span>
              </div>
              <p className="text-gray-400">
                Connecting People With Nature — One App for Plant & Pet Lovers
              </p>
            </div>

            {/* Contact */}
            <div className="text-right">
              <p className="text-gray-400 mb-2">
                Email us: <a href="mailto:app.bloomiee@gmail.com" className="text-emerald-400 hover:text-emerald-300">
                  app.bloomiee@gmail.com
                </a>
              </p>
              <p className="text-gray-500 text-sm">
                © 2025 Bloomie. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );

}

export default Footer;