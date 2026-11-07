/**
 * INFRANOVIX TECHNOLOGIES - cPanel Application Entry Point
 * 
 * cPanel's "Setup Node.js App" (Phusion Passenger) defaults to "app.js" as the startup file.
 * This file boots the compiled standalone Express server (server.js) so the real
 * Infranovix Technologies application loads instead of cPanel's default "It works!" placeholder.
 */
import './server.js';
