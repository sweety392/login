import "./globals.css";
import { CartProvider } from "./context/CartContext";

import { Toaster } from "react-hot-toast";
import {WishlistProvider} from "./context/wishlistContext"

import Providers from "./providers";
// import Header from "./components/admin/Header";

export default function RootLayout({
  children,
}) {
  return (
    <html>
      
      <body>
        
        <Providers>
           <WishlistProvider>
          <CartProvider>
            
          {children}
          
          <Toaster/>
          </CartProvider>
          </WishlistProvider>
        </Providers>
        


      </body>
    </html>
  );
}
