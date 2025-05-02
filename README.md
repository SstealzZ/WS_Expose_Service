# Workshop: Securely Exposing Web Services

## About this Workshop

This workshop introduces three modern and reliable methods for securely exposing a self-hosted web service to the internet. You will learn how to configure and use:

- Cloudflare Tunnel (HTTPS)
- Tailscale (private mesh network)
- WireGuard (VPN)

## Workshop Objective

The main goal of this workshop is to successfully access the demo dashboard using three different secure exposure methods:
1. Access your dashboard through Cloudflare Tunnel
2. Access your dashboard through Tailscale mesh network
3. Access your dashboard through WireGuard VPN

Each section will guide you through the setup and configuration process, allowing you to compare the different approaches based on real-world implementation.

## Prerequisites

- WSL or Linux distribution
- Administrator access on your computer
- (Recommended) Domain name managed by Cloudflare for the Cloudflared section
- The demonstration dashboard provided in this repository

## Demonstration Dashboard

This repository contains a technology dashboard developed with React, TypeScript, and Vite. This dashboard will serve as the web service to be exposed during the practical exercises.

## Dashboard Installation and Launch

```bash
# Clone the repository
git clone https://github.com/your-repo/WS_Expose_Service.git
cd WS_Expose_Service/tech-business-dashboard

# Install dependencies
npm install

# Start the dashboard in development mode
npm run dev
```

The dashboard will be locally accessible at http://localhost:5173

## Workshop Schedule

### 1. Introduction and Security Context (10 min)
- Risks associated with direct service exposure
- Differences between HTTPS exposure and full tunneling
- Overview of the three techniques we will explore

### 2. Cloudflare Tunnel Configuration (35 min)
- Installing and configuring cloudflared
- Creating a secure HTTPS tunnel to your local service
- Accessing your dashboard through a custom domain
- (Optional) Using Cloudflare Zero Trust for access control

### 3. Private Mesh Network with Tailscale (30 min)
- Installing and authenticating with Tailscale
- Connecting multiple devices in a secure mesh network
- Accessing your dashboard via private Tailscale IP
- Testing cross-device connectivity in the private network

### 4. VPN Tunnel with WireGuard using WG-Easy (30 min)
- Introduction to WireGuard and the WG-Easy administration interface
- Setting up WG-Easy Docker container for simplified management
- Creating and configuring client profiles through the web UI
- Accessing your dashboard through the WireGuard tunnel
- Scanning QR codes for mobile device configuration
- Enabling persistent remote access via private IP

### 5. Summary and Best Practices (15 min)
- Comparative table (security, performance, complexity)
- Recommendations for personal vs. professional use
- Discussion of which method works best for different scenarios
- Resource kit: installation scripts, cheat sheet, documentation

## Resources

### Cloudflare Tunnel
- [Official Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Quick Start Guides](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/)

### Tailscale
- [Official Documentation](https://tailscale.com/kb/)
- [Installation Guide](https://tailscale.com/download)

### WireGuard & WG-Easy
- [WireGuard Official Website](https://www.wireguard.com/)
- [WG-Easy GitHub Repository](https://github.com/WeeJeWel/wg-easy)
- [Docker Hub: WG-Easy](https://hub.docker.com/r/weejewel/wg-easy)

## Contact

For any questions or additional assistance:
- **Organizer**: Antoine Veber
- **Email**: antoine.veber@epitech.eu

---

*This workshop is designed for developers, system administrators, and technology enthusiasts who want to learn how to securely expose their personal or professional web services.* 