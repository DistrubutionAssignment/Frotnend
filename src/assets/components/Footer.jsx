import React from 'react'

export default function Footer() {
  return (
<div className="footer">
    <div className="footer-group">
            <p>Copyright © 2025 Peterdraw</p>
            <a href="">Privacy Policy</a>
            <a href="">Term and conditions</a>
            <a href="">Contact</a>
    </div>
    <div className="footer-icons">
        <button className="media-btn">
            <img src="/public/img/FacebookLogo.svg" alt="FacebookLogo"></img> 
        </button>
        <button className="media-btn">
            <img src="/public/img/XLogo.svg" alt="XLogo"></img>
        </button>
        <button className="media-btn">
            <img src="/public/img/InstagramLogo.svg" alt="InstagramLogo"></img>
        </button>
        <button className="media-btn">
            <img src="/public/img/YoutubeLogo.svg" alt="YoutubeLogo"></img>
        </button>
        <button className="media-btn">
            <img src='/public/img/LinkedinLogo.svg' alt="LinkedinLogo"></img>
        </button>
    </div>
</div>
  )
}
