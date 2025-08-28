import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = "100px" }) {
  return (
    <div style={{ width }}>
      <img
        src="https://api.logo.com/api/v2/images?design=lg_vUUtALSpKE1flNFWJR&u=0c3aaf96fe64038f2c32b4df5bb434f4520e2717327a537326f50ca1b0cae423&width=1600&height=900&margins=300&fit=contain&format=webp&quality=60&tightBounds=true"
        alt="logo"
        className="w-full"
      />
    </div>
  );
}

export default Logo