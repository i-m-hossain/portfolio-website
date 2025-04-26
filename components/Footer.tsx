export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 z-50">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {currentYear} Md Imran Hossain. All rights reserved.</p>
      </div>
    </footer>
  )
}
