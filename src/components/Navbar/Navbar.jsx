import React from 'react'

const Navbar = () => {
  return (
    <div>
        {Array.from({ length: 25 }).map((_, idx) => (
         <p key={idx} className="text-gray-700">
             <span className="font-semibold text-indigo-600">Item #{idx + 1}: </span>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris.
         </p>
        ))}
    </div>
  )
}

export default Navbar
