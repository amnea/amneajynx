#!/usr/bin/env python3
"""Simple HTTP file server."""

import argparse
import http.server
import socketserver
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Serve files over HTTP")
    parser.add_argument(
        "-p", "--port",
        type=int,
        default=8000,
        help="Port to serve on (default: 8000)"
    )
    parser.add_argument(
        "-d", "--directory",
        type=str,
        default=".",
        help="Directory to serve (default: current directory)"
    )
    parser.add_argument(
        "-b", "--bind",
        type=str,
        default="0.0.0.0",
        help="Address to bind to (default: 0.0.0.0)"
    )
    args = parser.parse_args()

    directory = Path(args.directory).resolve()
    if not directory.is_dir():
        print(f"Error: {directory} is not a valid directory")
        return 1

    handler = lambda *handler_args: http.server.SimpleHTTPRequestHandler(
        *handler_args, directory=str(directory)
    )

    with socketserver.TCPServer((args.bind, args.port), handler) as httpd:
        print(f"Serving {directory} at http://{args.bind}:{args.port}")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
