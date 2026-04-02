// Chapter 7: Computer Networks & Network Programming
const CH7 = {
    id: 6,
    title: "Computer Networks & Network Programming",
    icon: "📡",
    marks: 14,
    color: "#f59e0b",
    topics: "OSI/TCP-IP Models, LAN Technologies, IP Routing, TCP/UDP, DNS, Encryption, Kerberos, Socket Programming, Web Services",

    overview: {
        importance: "Joint highest weightage at 14 marks. Covers networking fundamentals, security, and programming. OSI model, TCP/IP, and encryption are very high-probability topics. Socket programming is unique to this syllabus.",
        weightage: "14 out of 100 marks (14%)",
        focusAreas: [
            "OSI vs TCP/IP model comparison",
            "IEEE 802.x LAN standards",
            "IP routing and congestion control",
            "TCP vs UDP comparison",
            "Encryption algorithms (DES, AES, RSA)",
            "Socket programming basics"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>7.1 OSI Reference Model</h4>
<p>The <strong>OSI (Open Systems Interconnection)</strong> model is a conceptual framework that standardizes network communication into <strong>7 layers</strong>. Each layer has specific responsibilities and communicates with the layers directly above and below it. Think of it as a division of labor — each layer does one job and passes the result to the next.</p>

<p>Data moves <em>down</em> the layers at the sender (each layer adds its header — called <strong>encapsulation</strong>) and <em>up</em> the layers at the receiver (each layer strips its header — <strong>decapsulation</strong>).</p>

<div class="diagram-block">
OSI MODEL (7 Layers):
┌─────────────────────────────┐
│ 7. APPLICATION              │  HTTP, FTP, SMTP, DNS
├─────────────────────────────┤
│ 6. PRESENTATION             │  Encryption, Compression, Translation
├─────────────────────────────┤
│ 5. SESSION                  │  Session management, Synchronization
├─────────────────────────────┤
│ 4. TRANSPORT                │  TCP, UDP, Segmentation, Flow control
├─────────────────────────────┤
│ 3. NETWORK                  │  IP, Routing, Logical addressing
├─────────────────────────────┤
│ 2. DATA LINK                │  MAC, LLC, Framing, Error detection
├─────────────────────────────┤
│ 1. PHYSICAL                 │  Bits, Cables, Signals, Hubs
└─────────────────────────────┘
  Data Unit: Data→Data→Data→Segments→Packets→Frames→Bits</div>

<p><strong>Layer details:</strong></p>
<ul>
<li><strong>Layer 7 - Application:</strong> The layer closest to the end user. Provides network services to applications. Protocols: HTTP (web), FTP (file transfer), SMTP (email sending), DNS (name resolution), SNMP (network management), Telnet, SSH. <em>Note:</em> The "application" here is NOT your browser or email client — it's the network protocol they use.</li>
<li><strong>Layer 6 - Presentation:</strong> Handles data <strong>format translation</strong> between the application and network. Responsibilities: Data encryption/decryption (SSL/TLS), data compression, character encoding conversion (ASCII ↔ EBCDIC ↔ Unicode), data serialization (e.g., converting objects to JSON/XML for transmission).</li>
<li><strong>Layer 5 - Session:</strong> Manages <strong>sessions</strong> (dialogues) between applications. Establishes, maintains, and terminates connections. Handles synchronization (checkpoints so data transfer can resume after a failure) and dialog control (half-duplex vs full-duplex). Examples: NetBIOS, PPTP, RPCs.</li>
<li><strong>Layer 4 - Transport:</strong> Provides <strong>end-to-end communication</strong> between processes on different hosts. Handles segmentation/reassembly, flow control, error recovery. Key protocols: TCP (reliable, connection-oriented) and UDP (unreliable, connectionless). Uses <strong>port numbers</strong> to identify specific applications.</li>
<li><strong>Layer 3 - Network:</strong> Handles <strong>logical addressing</strong> (IP addresses) and <strong>routing</strong> — finding the best path from source to destination across multiple networks. Devices: routers. Protocols: IP, ICMP (ping), ARP (IP to MAC), IGMP (multicast).</li>
<li><strong>Layer 2 - Data Link:</strong> Handles <strong>physical addressing</strong> (MAC addresses), framing (packaging raw bits into frames), error detection (CRC), and access control (who can transmit when). Two sublayers: LLC (Logical Link Control — interface to Network layer) and MAC (Media Access Control — controls hardware access). Devices: switches, bridges.</li>
<li><strong>Layer 1 - Physical:</strong> Deals with the physical transmission of <strong>raw bits</strong> over the communication medium. Defines cables, connectors, voltages, bit rates, signal encoding. Devices: hubs, repeaters, cables, fiber optics. This is the "hardware" layer.</li>
</ul>

<h4>7.2 TCP/IP Model</h4>
<p>The <strong>TCP/IP model</strong> is the practical model actually used in the Internet. It has <strong>4 layers</strong> (combining some OSI layers) and was developed before OSI as part of the ARPANET project.</p>
<div class="diagram-block">
TCP/IP vs OSI:
┌─────────────┐     ┌─────────────────┐
│ Application │◀───▶│ Application     │
│             │     │ Presentation    │
│             │     │ Session         │
├─────────────┤     ├─────────────────┤
│ Transport   │◀───▶│ Transport       │
├─────────────┤     ├─────────────────┤
│ Internet    │◀───▶│ Network         │
├─────────────┤     ├─────────────────┤
│ Network     │◀───▶│ Data Link       │
│ Access      │     │ Physical        │
└─────────────┘     └─────────────────┘
  TCP/IP (4)           OSI (7)</div>
<p><strong>Key difference:</strong> TCP/IP merges OSI's Application, Presentation, and Session into one "Application" layer, and merges Data Link and Physical into "Network Access." TCP/IP is practical and implemented; OSI is theoretical and useful for understanding.</p>

<h4>7.3 Physical Media Characteristics</h4>
<p>The choice of transmission medium affects bandwidth, distance, cost, and interference susceptibility:</p>
<table class="content-table">
<tr><th>Medium</th><th>Bandwidth</th><th>Distance</th><th>Interference</th></tr>
<tr><td>Twisted Pair (UTP)</td><td>Up to 10 Gbps</td><td>100m</td><td>Moderate (reduced by twisting)</td></tr>
<tr><td>Coaxial Cable</td><td>Up to 10 Gbps</td><td>500m</td><td>Low (shielded)</td></tr>
<tr><td>Fiber Optic</td><td>100+ Gbps</td><td>100+ km</td><td>None (uses light, immune to EMI)</td></tr>
<tr><td>Wireless (Wi-Fi)</td><td>Up to 9.6 Gbps</td><td>50-100m</td><td>High (walls, other signals)</td></tr>
</table>
<p><strong>Twisted Pair</strong> is most common (Ethernet cables — Cat5e, Cat6). Fiber optic is used for long distances and backbone networks. Wireless (802.11) is used for LANs and mobile access.</p>

<h4>7.4 Multiplexing</h4>
<p><strong>Multiplexing</strong> combines multiple signals onto a single communication channel, maximizing bandwidth utilization:</p>
<ul>
<li><strong>FDM (Frequency Division Multiplexing):</strong> Each signal is assigned a different <em>frequency band</em>. Like different radio stations broadcasting simultaneously on different frequencies. Used in analog telephone systems and cable TV.</li>
<li><strong>TDM (Time Division Multiplexing):</strong> Each signal gets the full bandwidth but only for specific <em>time slots</em>. Users take turns. Two types: Synchronous TDM (fixed time slots, even if no data) and Statistical TDM (dynamic allocation based on demand).</li>
<li><strong>WDM (Wavelength Division Multiplexing):</strong> Used specifically for <em>optical fiber</em>. Each signal uses a different wavelength (color) of light. Like FDM but for light waves. DWDM (Dense WDM) supports 100+ channels on a single fiber.</li>
<li><strong>CDM (Code Division Multiplexing):</strong> Each signal is encoded with a unique <em>code</em>. All signals are transmitted simultaneously over the full bandwidth. The receiver uses the matching code to extract its signal. Used in CDMA cellular networks.</li>
</ul>

<h4>7.5 Medium Access Protocols</h4>
<p>These protocols determine HOW multiple devices share a common communication medium (who talks when):</p>
<ul>
<li><strong>ALOHA:</strong> Earliest random access protocol. <strong>Pure ALOHA:</strong> Transmit whenever you have data. If collision occurs, wait random time and retransmit. Max throughput: only <strong>18.4%</strong> of channel capacity. <strong>Slotted ALOHA:</strong> Time divided into slots; transmit only at slot boundaries. Double the efficiency: <strong>36.8%</strong> max throughput.</li>
<li><strong>CSMA/CD (Carrier Sense Multiple Access / Collision Detection):</strong> The protocol used by <strong>Ethernet (wired LANs)</strong>. "Listen before you talk, and stop if someone else is talking." Steps: 1) Listen to channel. 2) If idle, transmit. 3) If busy, wait. 4) Monitor for collision during transmission. 5) If collision detected, send JAM signal, wait random time (Binary Exponential Backoff), retry.</li>
<li><strong>CSMA/CA (Collision Avoidance):</strong> Used by <strong>Wi-Fi (wireless LANs)</strong>. Can't detect collisions in wireless (the sender's signal drowns out other signals), so it tries to <em>avoid</em> them. Uses RTS/CTS (Request to Send / Clear to Send) mechanism and acknowledgments.</li>
<li><strong>Token Passing:</strong> A special token circulates around the network. Only the device holding the token can transmit. No collisions ever, but adds latency (must wait for token). Used in Token Ring (802.5) and FDDI networks.</li>
</ul>

<h4>7.6 IEEE 802 LAN Standards</h4>
<table class="content-table">
<tr><th>Standard</th><th>Name</th><th>Technology</th></tr>
<tr><td>802.3</td><td>Ethernet</td><td>CSMA/CD, wired LAN. Most ubiquitous LAN technology.</td></tr>
<tr><td>802.4</td><td>Token Bus</td><td>Token passing on bus topology. Rarely used today.</td></tr>
<tr><td>802.5</td><td>Token Ring</td><td>Token passing on ring topology. IBM's LAN standard, now obsolete.</td></tr>
<tr><td>802.11</td><td>Wi-Fi</td><td>Wireless LAN. Subtypes: a (5GHz), b (2.4GHz, 11Mbps), g (54Mbps), n (600Mbps), ac (6.9Gbps), ax/Wi-Fi 6 (9.6Gbps).</td></tr>
</table>

<h4>7.7 IP Protocol, Routing & Congestion Control</h4>
<p>The <strong>Internet Protocol (IP)</strong> is the primary network-layer protocol responsible for addressing and routing packets across interconnected networks.</p>
<ul>
<li><strong>IPv4:</strong> 32-bit address in dotted decimal notation (e.g., 192.168.1.1). Total addresses: 2<sup>32</sup> ≈ 4.3 billion (running out!). Header: 20 bytes minimum. Supports fragmentation.</li>
<li><strong>IPv6:</strong> 128-bit address in hexadecimal colon notation (e.g., 2001:0db8:85a3::8a2e:0370:7334). Virtually unlimited addresses: 2<sup>128</sup>. Fixed 40-byte header (faster processing). Built-in IPSec security. No fragmentation by routers.</li>
<li><strong>Subnetting:</strong> Dividing a network into smaller sub-networks. Uses a <strong>subnet mask</strong> to determine which bits are network vs host. CIDR notation: /24 means 24 network bits, 8 host bits. Hosts per subnet = 2<sup>(32-prefix)</sup> - 2 (subtract network address and broadcast address).</li>
<li><strong>Routing Algorithms</strong> determine the path packets take through the network:
    <ul>
    <li><strong>Distance Vector (RIP):</strong> Each router maintains a distance table. Based on <strong>Bellman-Ford</strong> algorithm. Metric: hop count (max 15 hops). Routers share distance tables with <em>neighbors only</em>. Simple but slow convergence and susceptible to <strong>count-to-infinity</strong> problem (solved by split horizon, poison reverse).</li>
    <li><strong>Link State (OSPF):</strong> Each router builds a complete map of the network topology. Based on <strong>Dijkstra's</strong> algorithm. Metric: bandwidth/cost. Routers share link state information with <em>ALL routers</em> (flooding). Faster convergence, more complex. Used in large enterprise networks.</li>
    <li><strong>Path Vector (BGP):</strong> Used for <strong>inter-domain</strong> routing (between autonomous systems on the Internet). Routers exchange path information (list of AS numbers). Prevents routing loops by checking if its own AS appears in the path.</li>
    </ul>
</li>
<li><strong>TCP Congestion Control</strong> prevents network overload:
  <ul>
  <li><strong>Slow Start:</strong> Begin with a small congestion window (cwnd = 1 MSS), double it each RTT. Exponential growth until threshold (ssthresh).</li>
  <li><strong>Congestion Avoidance:</strong> After reaching ssthresh, increase cwnd by 1 MSS per RTT (linear growth). Continue until packet loss.</li>
  <li><strong>On packet loss (timeout):</strong> Set ssthresh = cwnd/2, reset cwnd = 1, restart slow start. (Tahoe)</li>
  <li><strong>Fast Retransmit:</strong> On receiving 3 duplicate ACKs, retransmit lost segment immediately without waiting for timeout.</li>
  <li><strong>Fast Recovery (Reno):</strong> After fast retransmit, set ssthresh = cwnd/2, cwnd = ssthresh + 3 (skip slow start, go directly to congestion avoidance).</li>
  </ul>
</li>
</ul>

<h4>7.8 TCP and UDP</h4>
<p>These are the two main transport-layer protocols. Understanding their differences is one of the most commonly tested topics:</p>
<table class="content-table">
<tr><th>Feature</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection</td><td>Connection-oriented (3-way handshake)</td><td>Connectionless</td></tr>
<tr><td>Reliability</td><td>Reliable (ACK, retransmission)</td><td>Unreliable (best-effort)</td></tr>
<tr><td>Ordering</td><td>Ordered delivery (sequence numbers)</td><td>No ordering guarantee</td></tr>
<tr><td>Flow Control</td><td>Yes (sliding window)</td><td>No</td></tr>
<tr><td>Congestion Control</td><td>Yes (slow start, etc.)</td><td>No</td></tr>
<tr><td>Speed</td><td>Slower (overhead for reliability)</td><td>Faster (minimal overhead)</td></tr>
<tr><td>Header Size</td><td>20 bytes minimum</td><td>8 bytes (simple)</td></tr>
<tr><td>Use Cases</td><td>HTTP, FTP, Email, SSH</td><td>DNS, DHCP, Streaming, Gaming, VoIP</td></tr>
</table>

<div class="diagram-block">
TCP THREE-WAY HANDSHAKE:
Client                    Server
  │                         │
  │── SYN (seq=x) ────────▶│   ← Client initiates connection
  │                         │
  │◀── SYN-ACK ────────────│   ← Server acknowledges and sends its own SYN
  │   (seq=y, ack=x+1)     │
  │                         │
  │── ACK (ack=y+1) ───────▶│   ← Client acknowledges server's SYN
  │                         │
  │    Connection Established│
  │◀════════════════════════▶│</div>

<p><strong>TCP connection termination</strong> uses a <strong>4-way handshake:</strong> FIN → ACK → FIN → ACK. Either side can initiate. The TIME_WAIT state ensures all packets have been received before fully closing.</p>

<h4>7.9 DNS (Domain Name System)</h4>
<p><strong>DNS</strong> is the "phone book of the Internet" — it translates human-readable domain names (www.google.com) into machine-readable IP addresses (142.250.80.46). Without DNS, you'd need to memorize IP addresses for every website.</p>
<ul>
<li><strong>Hierarchy:</strong> Root DNS Servers (.) → TLD Servers (.com, .org, .in, .gov) → Authoritative Servers (google.com, psc.gov.in) → Individual records.</li>
<li><strong>Resolution Process:</strong> 1) Browser checks local cache. 2) OS checks hosts file. 3) Query sent to Recursive Resolver (ISP's DNS). 4) Resolver queries root → TLD → Authoritative server. 5) IP address returned and cached.</li>
<li><strong>Record Types:</strong> <strong>A</strong> (IPv4 address), <strong>AAAA</strong> (IPv6), <strong>CNAME</strong> (alias/canonical name), <strong>MX</strong> (mail server), <strong>NS</strong> (nameserver), <strong>TXT</strong> (text records for verification), <strong>SOA</strong> (start of authority).</li>
<li>Uses <strong>UDP port 53</strong> for standard queries (fast, small packets). Uses <strong>TCP port 53</strong> for zone transfers (large data, needs reliability) and responses exceeding 512 bytes.</li>
</ul>

<h4>7.10 Email Protocols</h4>
<ul>
<li><strong>SMTP (Simple Mail Transfer Protocol):</strong> For <em>sending</em> email. Port 25 (unencrypted) or 587 (TLS). Push protocol — the sender initiates. Used between mail servers and from client to server.</li>
<li><strong>POP3 (Post Office Protocol v3):</strong> For <em>retrieving</em> email. Port 110 (or 995 for SSL). Downloads emails to the client and typically <strong>deletes from server</strong>. Simple but emails available only on one device.</li>
<li><strong>IMAP (Internet Message Access Protocol):</strong> For <em>accessing</em> email. Port 143 (or 993 for SSL). <strong>Keeps emails on server</strong> — just synchronizes with client. Allows accessing same mailbox from multiple devices. Supports folders, search on server. Preferred for modern email usage.</li>
</ul>

<h4>7.11 Encryption & Security</h4>
<p>Encryption transforms plaintext into ciphertext using an algorithm and a key, making data unreadable to unauthorized parties. This is fundamental to network security.</p>

<h5>Symmetric Encryption (Same key for encrypt AND decrypt)</h5>
<p>Fast, efficient, good for bulk data encryption. Challenge: how to securely share the secret key?</p>
<ul>
<li><strong>DES (Data Encryption Standard):</strong> 56-bit key, 64-bit block size, 16 rounds of Feistel network. Once the standard; now <strong>insecure</strong> due to small key size (brute-forceable). <strong>3DES:</strong> Apply DES three times (Encrypt-Decrypt-Encrypt) with 2 or 3 keys — effective 112 or 168-bit key. Slower but more secure.</li>
<li><strong>AES (Advanced Encryption Standard):</strong> The current global standard. Key sizes: 128, 192, or 256 bits. Block size: 128 bits. Uses substitution-permutation network (not Feistel). Very fast in both hardware and software. Used in HTTPS, VPNs, Wi-Fi (WPA2), disk encryption.</li>
<li><strong>IDEA (International Data Encryption Algorithm):</strong> 128-bit key, 64-bit block, 8 rounds. Used in PGP (Pretty Good Privacy) for email encryption.</li>
</ul>

<h5>Asymmetric Encryption (Public + Private key pair)</h5>
<p>Uses two mathematically related keys: anything encrypted with the public key can ONLY be decrypted with the private key, and vice versa. Slower than symmetric, but solves the key distribution problem.</p>
<ul>
<li><strong>RSA (Rivest-Shamir-Adleman):</strong> The most widely used asymmetric algorithm. Based on the mathematical difficulty of <strong>factoring large prime numbers</strong>.</li>
<li><strong>Key Generation:</strong> Choose two large primes p and q → compute n = p×q → compute φ(n) = (p-1)(q-1) → choose e (public exponent, typically 65537) such that gcd(e, φ(n)) = 1 → compute d = e<sup>-1</sup> mod φ(n) (private exponent).</li>
<li><strong>Encryption:</strong> C = M<sup>e</sup> mod n (using public key). <strong>Decryption:</strong> M = C<sup>d</sup> mod n (using private key).</li>
<li><strong>Digital Signatures:</strong> Sign with private key (proves identity), verify with public key. Ensures authenticity and non-repudiation.</li>
</ul>

<h5>Key Management</h5>
<ul>
<li><strong>Symmetric key distribution:</strong> <strong>KDC (Key Distribution Center)</strong> — trusted third party that generates and distributes session keys. <strong>Diffie-Hellman key exchange</strong> — allows two parties to agree on a shared secret over an insecure channel. Based on discrete logarithm problem.</li>
<li><strong>Asymmetric:</strong> <strong>Certificate Authority (CA)</strong> — issues digital certificates that bind a public key to an identity. <strong>PKI (Public Key Infrastructure)</strong> — complete system for creating, managing, distributing, and revoking digital certificates.</li>
</ul>

<h4>7.12 Kerberos</h4>
<p><strong>Kerberos</strong> is a network authentication protocol that uses <strong>symmetric encryption</strong> and a <strong>trusted third party (KDC)</strong> to securely authenticate users over an insecure network. Named after the three-headed dog from Greek mythology (because it has three components: Client, Server, KDC).</p>
<ul>
<li><strong>Components:</strong> Client (user), Application Server (service to access), KDC = Authentication Server (AS) + Ticket Granting Server (TGS).</li>
<li><strong>Key concepts:</strong> <strong>TGT (Ticket Granting Ticket)</strong> — a temporary credential that lets you request service tickets without re-entering your password. <strong>Service Ticket</strong> — proves to a server that you're authenticated.</li>
<li><strong>Advantages:</strong> Mutual authentication (both client and server verify each other), passwords never sent over the network, time-limited tickets (reduces window for replay attacks).</li>
<li><strong>Used by:</strong> Windows Active Directory, many enterprise systems.</li>
</ul>

<div class="diagram-block">
KERBEROS AUTHENTICATION:
┌────────┐     1. Request TGT    ┌────────────┐
│ CLIENT │──────────────────────▶│   AS       │
│        │◀────2. TGT────────────│(Auth Server)│
│        │                       └────────────┘
│        │     3. TGT + request  ┌────────────┐
│        │──────────────────────▶│   TGS      │
│        │◀────4. Service Ticket─│(Ticket     │
│        │                       │ Granting)  │
│        │     5. Service Ticket └────────────┘
│        │──────────────────────▶┌────────────┐
│        │◀────6. Authenticated──│  SERVICE   │
│        │       (mutual auth)   │  SERVER    │
└────────┘                       └────────────┘</div>

<h4>7.13 Network Programming — Socket Programming</h4>
<p>A <strong>socket</strong> is an endpoint for communication between two machines. It's identified by an IP address + port number combination. Socket programming allows you to write applications that communicate over a network.</p>

<h5>TCP Socket Programming (Connection-oriented)</h5>
<p>Reliable, ordered communication. The server must be running and listening before the client connects.</p>
<div class="code-block">// TCP Server (pseudo-code)
socket = create_socket(AF_INET, SOCK_STREAM)  // SOCK_STREAM = TCP
bind(socket, address, port)        // Associate socket with address:port
listen(socket, backlog)            // Mark socket as passive (accept connections)
client = accept(socket)            // Wait for client (blocks until connection)
data = recv(client)                // Receive data from client
send(client, response)             // Send response back
close(client)                      // Close client connection

// TCP Client
socket = create_socket(AF_INET, SOCK_STREAM)
connect(socket, server_address, port)  // Initiate 3-way handshake
send(socket, data)                     // Send data to server
response = recv(socket)               // Receive response
close(socket)                         // Close connection</div>

<h5>UDP Socket Programming (Connectionless)</h5>
<p>No connection setup, no reliability guarantees. Faster for small, independent messages.</p>
<div class="code-block">// UDP Server
socket = create_socket(AF_INET, SOCK_DGRAM)  // SOCK_DGRAM = UDP
bind(socket, address, port)
data, addr = recvfrom(socket)      // Receive data AND sender's address
sendto(socket, response, addr)     // Send response to sender

// UDP Client (no connect needed)
socket = create_socket(AF_INET, SOCK_DGRAM)
sendto(socket, data, server_addr)  // Send directly (no connection)
response = recvfrom(socket)        // Receive response</div>

<p><strong>Key differences in socket calls:</strong> TCP uses connect()/accept() (connection establishment), send()/recv() (connected communication). UDP uses sendto()/recvfrom() (each message independently addressed, no connection state).</p>

<h4>7.14 Secure Communications</h4>
<ul>
<li><strong>SSL/TLS (Secure Sockets Layer / Transport Layer Security):</strong> Encrypts data between client and server. TLS is the successor to SSL (SSL 3.0 is deprecated). The TLS handshake negotiates encryption algorithms, exchanges keys, and authenticates the server. All HTTPS traffic uses TLS.</li>
<li><strong>SSH (Secure Shell):</strong> Provides encrypted remote access to servers (port 22). Replaces insecure Telnet and rlogin. Also supports secure file transfer (SFTP, SCP) and port forwarding (tunneling).</li>
<li><strong>HTTPS:</strong> HTTP over TLS (port 443). The browser verifies the server's digital certificate, then all communication is encrypted.</li>
<li><strong>TFTP (Trivial File Transfer Protocol):</strong> Simple file transfer over UDP (port 69). No authentication, no encryption. Used for network booting (PXE) and firmware updates on simple devices.</li>
</ul>

<h4>7.15 RMI, SOAP, UDDI, Web Services</h4>
<p><strong>Web Services</strong> are standardized ways for applications to communicate over the Internet, regardless of platform or language.</p>
<ul>
<li><strong>RMI (Remote Method Invocation):</strong> Java-specific technology for invoking methods on objects running in a different JVM (possibly on a different machine). Uses stubs (client-side proxy) and skeletons (server-side receiver). Requires RMI Registry for object lookup. Not cross-platform (Java only).</li>
<li><strong>SOAP (Simple Object Access Protocol):</strong> A protocol for exchanging structured information using XML. Each SOAP message has an <strong>Envelope</strong> containing a <strong>Header</strong> (optional metadata) and <strong>Body</strong> (actual request/response data). <strong>Fault</strong> element reports errors. Transport-independent (works over HTTP, SMTP, TCP). Standardized, formal, enterprise-grade but verbose.</li>
<li><strong>UDDI (Universal Description, Discovery and Integration):</strong> A directory service for web services — like a "Yellow Pages" where businesses register their web services so others can discover and use them. Less commonly used today with the rise of REST APIs.</li>
<li><strong>WSDL (Web Services Description Language):</strong> An XML document that describes what a web service does, what operations it provides, what messages it expects/returns, and where it's located. Like an API documentation in XML format.</li>
<li><strong>REST (Representational State Transfer):</strong> A lightweight architectural style (not a protocol) using standard <strong>HTTP methods</strong>: GET (read), POST (create), PUT (update), DELETE (remove). Returns JSON or XML. Stateless, cacheable, simpler than SOAP. The dominant approach for modern APIs.</li>
</ul>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">OSI LAYERS (Top to Bottom):
7-Application, 6-Presentation, 5-Session,
4-Transport, 3-Network, 2-Data Link, 1-Physical
Mnemonic: "All People Seem To Need Data Processing"</div>

<div class="formula-box">IP ADDRESSING:
• Class A: 1.0.0.0 - 126.255.255.255 (/8, 16M hosts)
• Class B: 128.0.0.0 - 191.255.255.255 (/16, 65K hosts)
• Class C: 192.0.0.0 - 223.255.255.255 (/24, 254 hosts)
• Hosts per subnet = 2^(32-prefix) - 2</div>

<div class="formula-box">TCP vs UDP PORTS:
HTTP: 80 | HTTPS: 443 | FTP: 20/21 | SSH: 22
SMTP: 25 | POP3: 110 | IMAP: 143 | DNS: 53
Telnet: 23 | TFTP: 69 | DHCP: 67/68</div>

<div class="formula-box">RSA:
1. Choose primes p, q → n = p×q
2. φ(n) = (p-1)(q-1)
3. Choose e: 1 < e < φ(n), gcd(e,φ(n))=1
4. d = e⁻¹ mod φ(n)
5. Encrypt: C = M^e mod n
6. Decrypt: M = C^d mod n
Public key: (e, n) | Private key: (d, n)</div>

<div class="formula-box">SOCKET TYPES:
SOCK_STREAM → TCP (reliable, connected)
SOCK_DGRAM  → UDP (unreliable, connectionless)
SOCK_RAW    → Raw IP (custom protocols)</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
TCP/IP PROTOCOL STACK:
┌──────────────────────────────────────┐
│ APPLICATION: HTTP FTP SMTP DNS SNMP │
├──────────────────────────────────────┤
│ TRANSPORT:    TCP        UDP        │
├──────────────────────────────────────┤
│ INTERNET:     IP   ICMP   ARP       │
├──────────────────────────────────────┤
│ NETWORK ACCESS: Ethernet Wi-Fi PPP  │
└──────────────────────────────────────┘</div>

<div class="diagram-block">
SYMMETRIC vs ASYMMETRIC ENCRYPTION:

SYMMETRIC:
PlainText ──[Key K]──▶ CipherText ──[Key K]──▶ PlainText
              SAME KEY for both operations

ASYMMETRIC (RSA):
PlainText ──[Public Key]──▶ CipherText ──[Private Key]──▶ PlainText
             DIFFERENT KEYS (key pair)</div>

<div class="diagram-block">
SOAP MESSAGE STRUCTURE:
┌──────────────────────┐
│    SOAP Envelope     │
│ ┌──────────────────┐ │
│ │   SOAP Header    │ │  (optional: auth, routing)
│ ├──────────────────┤ │
│ │   SOAP Body      │ │  (required: method call/response)
│ │ ┌──────────────┐ │ │
│ │ │  Fault       │ │ │  (optional: error info)
│ │ └──────────────┘ │ │
│ └──────────────────┘ │
└──────────────────────┘</div>
`,

    examples: [
        {title:"Subnet Calculation", question:"Given IP 192.168.1.0/26, find subnet mask, number of subnets, and hosts per subnet.", solution:"/26 means 26 network bits, 6 host bits\nSubnet Mask: 255.255.255.192 (11111111.11111111.11111111.11000000)\nSubnets: 2^2 = 4 (using 2 bits from last octet)\nHosts per subnet: 2^6 - 2 = 62 usable hosts\nSubnet ranges: .0-.63, .64-.127, .128-.191, .192-.255"},
        {title:"RSA Encryption", question:"Given p=3, q=11, e=7, encrypt M=5.", solution:"n = 3×11 = 33\nφ(n) = (3-1)(11-1) = 20\ne = 7, gcd(7,20) = 1 ✓\nd = 7⁻¹ mod 20 = 3 (since 7×3=21≡1 mod 20)\nEncrypt: C = 5^7 mod 33 = 78125 mod 33 = 14\nDecrypt: M = 14^3 mod 33 = 2744 mod 33 = 5 ✓"},
        {title:"TCP vs UDP", question:"Why does DNS use UDP but HTTP uses TCP?", solution:"DNS uses UDP because:\n- Queries are small (fits in one packet)\n- Speed is critical (no handshake needed)\n- Stateless request-response\n\nHTTP uses TCP because:\n- Web pages are large (need reliable delivery)\n- Ordered delivery matters (HTML structure)\n- Connection-oriented guarantees completeness"},
        {title:"TCP Socket Flow", question:"Describe the TCP socket programming sequence.", solution:"Server:\n1. socket() → create endpoint\n2. bind() → assign address+port\n3. listen() → mark as passive\n4. accept() → wait for connection (blocking)\n5. recv()/send() → data exchange\n6. close()\n\nClient:\n1. socket() → create endpoint\n2. connect() → initiate 3-way handshake\n3. send()/recv() → data exchange\n4. close()"},
        {title:"OSI Layer Functions", question:"At which OSI layer does a router operate?", solution:"Router operates at Layer 3 (Network Layer)\n- Makes forwarding decisions based on IP addresses\n- Uses routing tables and algorithms\n- Handles logical addressing (IP)\n\nSwitch: Layer 2 (Data Link) — uses MAC addresses\nHub: Layer 1 (Physical) — just repeats signals\nFirewall: Layer 3-7 (depending on type)"},
        {title:"CSMA/CD", question:"Explain CSMA/CD operation in Ethernet.", solution:"1. Listen before transmitting (Carrier Sense)\n2. If channel idle → transmit\n3. If channel busy → wait\n4. During transmission, monitor for collision (Collision Detection)\n5. If collision detected:\n   a. Send JAM signal\n   b. Wait random time (Binary Exponential Backoff)\n   c. Retry from step 1\n6. After 16 retries → report failure"},
        {title:"Kerberos Steps", question:"Describe the Kerberos authentication process.", solution:"1. Client → AS: 'I am user X, want TGT'\n2. AS → Client: TGT encrypted with TGS key + Session key encrypted with user's key\n3. Client decrypts session key using password\n4. Client → TGS: TGT + Authenticator + Service Request\n5. TGS → Client: Service Ticket\n6. Client → Server: Service Ticket + Authenticator\n7. Server verifies → grants access"},
        {title:"DES Overview", question:"Describe DES encryption algorithm.", solution:"Data Encryption Standard:\n- Block cipher: 64-bit blocks\n- Key: 56 bits (64 with 8 parity bits)\n- 16 rounds of Feistel structure\n- Each round: Expansion, XOR with subkey,\n  S-box substitution, P-box permutation\n- Initial and Final permutation\n- Insecure today due to small key size\n- 3DES: Apply DES three times (168-bit effective key)"},
        {title:"Web Service", question:"Compare SOAP and REST web services.", solution:"SOAP:\n- XML-based protocol\n- Envelope/Header/Body structure\n- WSDL for description\n- More overhead, enterprise-grade\n- Transport: HTTP, SMTP, TCP\n\nREST:\n- Architectural style, not protocol\n- Uses HTTP methods (GET/POST/PUT/DELETE)\n- JSON or XML response\n- Lightweight, faster\n- Stateless, cacheable"},
        {title:"RMI Architecture", question:"Explain Java RMI architecture.", solution:"Remote Method Invocation:\n1. Client has Stub (proxy for remote object)\n2. Server has Skeleton (receives requests)\n3. RMI Registry: Lookup service for remote objects\n\nFlow:\n- Server registers object with registry\n- Client looks up object from registry\n- Client calls method on stub\n- Stub marshals parameters → sends to skeleton\n- Skeleton unmarshals → calls actual method\n- Result returned through skeleton → stub → client"}
    ],

    practiceQuestions: [
        {question: "Compare OSI and TCP/IP models.", answer: "OSI: 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application). Theoretical model.\nTCP/IP: 4 layers (Network Access, Internet, Transport, Application). Practical implementation.\nCorrespondence: TCP/IP's Network Access = OSI 1+2. Internet = OSI 3. Transport = OSI 4. Application = OSI 5+6+7.\nOSI separates concerns clearly but is not directly implemented. TCP/IP is what the internet actually uses."},
        {question: "Functions of each OSI layer with protocol examples.", answer: "L7 Application: User interface. HTTP, FTP, SMTP, DNS.\nL6 Presentation: Data format, encryption, compression. SSL/TLS, JPEG, ASCII.\nL5 Session: Session management, synchronization. NetBIOS, RPC.\nL4 Transport: End-to-end delivery, segmentation, flow control. TCP, UDP.\nL3 Network: Routing, logical addressing. IP, ICMP, OSPF.\nL2 Data Link: Framing, MAC addressing, error detection. Ethernet, PPP, ARP.\nL1 Physical: Bit transmission. RS-232, RJ-45, fiber optic."},
        {question: "Compare twisted pair, coaxial, and fiber optic.", answer: "Twisted Pair: Cheap, easy to install. Max ~100m. Cat5e: 1Gbps, Cat6: 10Gbps. Susceptible to EMI. Used in LANs.\nCoaxial: Better shielding than TP. Used in cable TV, some LANs. Higher bandwidth than TP, more expensive.\nFiber Optic: Light-based. Immune to EMI. Very high bandwidth (100+ Gbps). Long distance (km). Most expensive to install. Single-mode (long distance) vs Multi-mode (shorter, cheaper)."},
        {question: "Explain FDM, TDM, and WDM.", answer: "FDM (Frequency Division): Divides bandwidth into frequency bands. Each signal gets a different frequency. Used in radio, cable TV. Guard bands prevent interference.\nTDM (Time Division): Divides time into slots. Each signal gets a time slot in round-robin. Used in digital telephony. Synchronous (fixed slots) or Statistical (dynamic allocation).\nWDM (Wavelength Division): For fiber optic. Each signal uses different light wavelength (color). Like FDM but for light. DWDM: Dense WDM — more channels."},
        {question: "CSMA/CD vs CSMA/CA.", answer: "CSMA/CD (Collision Detection): Used in wired Ethernet (802.3).\n1. Listen before transmitting. 2. If busy, wait. 3. If collision detected during transmission, stop and send jam signal. 4. Wait random backoff time, retry.\n\nCSMA/CA (Collision Avoidance): Used in wireless (802.11).\n1. Listen. 2. If free, wait DIFS time, then send. 3. Receiver sends ACK. 4. If no ACK, assume collision, use exponential backoff.\nCA avoids collisions (can't detect in wireless); CD detects them."},
        {question: "Compare IEEE 802.3, 802.4, 802.5, 802.11.", answer: "802.3 (Ethernet): CSMA/CD. Bus/Star topology. Most common LAN. 10Mbps to 100Gbps.\n802.4 (Token Bus): Token passing on bus. Used in manufacturing (MAP). Deterministic access. Largely obsolete.\n802.5 (Token Ring): Token passing on ring. IBM developed. Deterministic, fair access. Largely replaced by Ethernet.\n802.11 (WiFi): CSMA/CA. Wireless LAN. Versions: a(54M), b(11M), g(54M), n(600M), ac(6.9G), ax/WiFi6(9.6G)."},
        {question: "IPv4 addressing classes and subnetting.", answer: "Class A: 1.0.0.0-126.x.x.x. /8 mask. 16M hosts. Large networks.\nClass B: 128.0.0.0-191.255.x.x. /16 mask. 65K hosts. Medium networks.\nClass C: 192.0.0.0-223.255.255.x. /24 mask. 254 hosts. Small networks.\nClass D: 224-239. Multicast. Class E: 240-255. Experimental.\nSubnetting: Borrow host bits for subnets. Example: 192.168.1.0/26 → 4 subnets of 62 hosts each. Subnet mask: 255.255.255.192."},
        {question: "Compare RIP and OSPF routing.", answer: "RIP (Distance Vector): Uses hop count metric (max 15). Updates every 30s. Broadcast. Slow convergence. Simple. Suitable for small networks.\nOSPF (Link State): Uses cost metric (based on bandwidth). Event-triggered updates. Multicast. Fast convergence. Complex but efficient. For large networks.\nKey difference: RIP shares distance table with neighbors. OSPF shares link-state info with ALL routers and each builds full topology map."},
        {question: "TCP congestion control: slow start and congestion avoidance.", answer: "Slow Start: Begin with cwnd=1 MSS. Double cwnd each RTT (exponential growth). Continue until ssthresh reached.\nCongestion Avoidance: After ssthresh, increase cwnd by 1 MSS per RTT (linear growth).\nOn timeout: ssthresh = cwnd/2, cwnd = 1, restart slow start.\nOn 3 duplicate ACKs (Fast Recovery): ssthresh = cwnd/2, cwnd = ssthresh + 3, skip slow start.\nThis adaptive mechanism prevents network overload while maximizing throughput."},
        {question: "Compare TCP and UDP.", answer: "TCP: Connection-oriented (3-way handshake). Reliable (ACK, retransmission). Ordered delivery. Flow/congestion control. Slower. Used for: HTTP, FTP, email, file transfer.\nUDP: Connectionless. Unreliable (no ACK). No ordering guarantee. No flow control. Faster, lower overhead. Used for: DNS, DHCP, video streaming, gaming, VoIP.\nTCP = reliability matters. UDP = speed matters, can tolerate loss."},
        {question: "DNS resolution process.", answer: "1. User types example.com → Browser checks cache.\n2. OS checks hosts file, then local DNS cache.\n3. Query to Recursive Resolver (ISP's DNS server).\n4. Resolver checks cache → if miss, queries Root server (.)\n5. Root returns TLD server address (.com)\n6. TLD server returns Authoritative NS for example.com\n7. Authoritative NS returns IP address\n8. Resolver caches result, returns IP to browser\n9. Browser connects to IP via HTTP/HTTPS\nDNS uses UDP port 53 (TCP for zone transfers)."},
        {question: "Compare SMTP, POP3, and IMAP.", answer: "SMTP (Port 25/587): Send email. Push protocol. Used between mail servers and from client to server.\nPOP3 (Port 110/995): Download email to client, delete from server. Simple. Offline access. One device.\nIMAP (Port 143/993): Sync email — messages stay on server. Multiple device access. Folder management. Server-side search. More bandwidth.\nModern setup: SMTP for sending, IMAP for receiving (Gmail, Outlook default)."},
        {question: "Compare DES, AES, and RSA.", answer: "DES (Symmetric): 56-bit key. Block cipher (64-bit blocks). Now insecure — brute-forceable. Triple-DES (3DES) uses 168 bits.\nAES (Symmetric): 128/192/256-bit keys. 128-bit blocks. Current standard. Very fast. Used in TLS, disk encryption.\nRSA (Asymmetric): Key pair (public/private). Based on factoring large primes. 2048-4096 bit keys. Slower than symmetric. Used for key exchange, digital signatures.\nPractice: RSA exchanges AES key, then AES encrypts data (hybrid encryption)."},
        {question: "Diffie-Hellman key exchange.", answer: "Purpose: Allow two parties to create shared secret over insecure channel.\n1. Agree on public values: prime p, generator g.\n2. Alice picks secret a, sends A = g^a mod p.\n3. Bob picks secret b, sends B = g^b mod p.\n4. Alice computes: K = B^a mod p = g^(ab) mod p.\n5. Bob computes: K = A^b mod p = g^(ab) mod p.\nBoth now have same K without it being transmitted!\nVulnerable to man-in-the-middle (needs authentication alongside)."},
        {question: "Kerberos authentication protocol.", answer: "Components: Client, Authentication Server (AS), Ticket Granting Server (TGS), Service Server.\n1. Client → AS: Request TGT (sends username)\n2. AS → Client: TGT encrypted with TGS key + session key encrypted with client's password\n3. Client → TGS: TGT + authenticator (proves identity) + service request\n4. TGS → Client: Service ticket encrypted with service's key + new session key\n5. Client → Service: Service ticket + authenticator\n6. Service verifies ticket, grants access.\nAll tickets have timestamps to prevent replay attacks."},
        {question: "Write TCP echo server and client.", answer: "Server (Python):\nimport socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('0.0.0.0', 8080))\ns.listen(1)\nconn, addr = s.accept()\nwhile True:\n    data = conn.recv(1024)\n    if not data: break\n    conn.send(data)  # echo back\nconn.close()\n\nClient:\nc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nc.connect(('localhost', 8080))\nc.send(b'Hello')\nprint(c.recv(1024))\nc.close()"},
        {question: "SSL/TLS handshake process.", answer: "1. ClientHello: Supported TLS versions, cipher suites, random number.\n2. ServerHello: Chosen TLS version, cipher suite, random number.\n3. Server Certificate: Server sends its X.509 certificate (contains public key).\n4. Key Exchange: Server sends key exchange params (DH params or RSA).\n5. Client verifies certificate with CA.\n6. Client Key Exchange: Client sends pre-master secret (encrypted with server's public key).\n7. Both derive master secret → session keys.\n8. ChangeCipherSpec: Both switch to encrypted communication.\n9. Finished: Encrypted messages verify handshake integrity."},
        {question: "Compare SSH and Telnet.", answer: "Telnet: Port 23. NO encryption — all data (including passwords) sent in plaintext. No authentication beyond username/password. Insecure.\nSSH (Secure Shell): Port 22. Full encryption (symmetric after key exchange). Multiple auth methods (password, public key, certificates). Supports port forwarding, SFTP, SCP.\nSSH also provides: Integrity checking, compression, X11 forwarding.\nAlways use SSH instead of Telnet. Telnet should only be used in isolated, trusted networks."},
        {question: "SOAP architecture and WSDL.", answer: "SOAP (Simple Object Access Protocol): XML-based messaging protocol. Transport-independent (HTTP, SMTP, TCP). Platform-independent.\nStructure: Envelope → Header (optional metadata) + Body (actual message).\nWSDL (Web Services Description Language): XML document describing web service — what operations are available, input/output formats, endpoint URL.\nSections: Types, Message, PortType (operations), Binding (protocol), Service (endpoint URL).\nSOAP is heavyweight but provides WS-Security, transactions, reliability."},
        {question: "UDDI and web service discovery.", answer: "UDDI (Universal Description, Discovery, and Integration): Registry/directory for web services. Like a 'yellow pages' for services.\nComponents:\n• White Pages: Business name, contact, description\n• Yellow Pages: Business category/classification\n• Green Pages: Technical details — WSDL location, binding info\nPublish-Find-Bind pattern:\n1. Provider publishes service to UDDI registry\n2. Consumer searches UDDI to find service\n3. Consumer binds to service using WSDL info\nLargely replaced by REST APIs and API gateways in modern systems."}
    ],

    examTips: [
        "OSI model layers and their functions — highest priority topic in networking",
        "TCP vs UDP comparison — almost always asked",
        "Know common port numbers for major protocols",
        "RSA calculation (small numbers) is a popular exam question",
        "Kerberos authentication steps are frequently tested"
    ],

    commonMistakes: [
        "Confusing OSI Layer 2 (Data Link, frames) with Layer 3 (Network, packets)",
        "Forgetting that DNS primarily uses UDP, not TCP",
        "Mixing up symmetric (DES, AES) with asymmetric (RSA) encryption",
        "Confusing Kerberos with CA-based authentication",
        "Not remembering that SOCK_STREAM = TCP and SOCK_DGRAM = UDP"
    ],

    memoryTricks: [
        "OSI Layers: 'All People Seem To Need Data Processing' (Application to Physical)",
        "OSI Bottom-up: 'Please Do Not Throw Sausage Pizza Away' (Physical to Application)",
        "TCP = 'Trustworthy Communication Protocol' (reliable); UDP = 'Unreliable Datagram Protocol'",
        "RSA steps: 'Pick primes, Compute n & φ, Choose e, Find d, Encrypt/Decrypt'",
        "IEEE: '3=Ethernet, 4=Bus, 5=Ring, 11=WiFi' → '3-4-5 wired, 11 wireless'"
    ]
};
