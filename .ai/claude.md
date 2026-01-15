# CLAUDE PROJECT CONTEXT

> **Session Note (2026-01-06)**: This project was built in Claude Code CLI and is transitioning to VS Code. See `HANDOFF_TO_VSCODE.md` for full context. Current status: MVP complete with centerhung + ribbon displays working. Known issue: ProRes videos don't work in browsers (see `VIDEO_CONVERSION.md`).

## Project Goal
Build a 3D visualization tool to preview After Effects renders mapped onto Nationwide Arena LED displays without physically loading content into the venue's playback system.

## User Profile: Cody
- Motion Producer / Motion Designer
- Columbus Blue Jackets (Nationwide Arena)
- Advanced technical knowledge (After Effects, Cinema 4D, Redshift)
- Works in live sports broadcast environment
- Needs fast, reliable preview workflow

## The Problem
Currently, to see how AE renders look on arena displays, Cody must:
1. Export video files
2. Load them into the venue's playback system
3. View them on physical displays
4. Iterate and repeat

This is slow and prevents rapid iteration during content creation.

## The Solution
A 3D arena bowl simulator that:
- Loads video files onto virtual LED displays
- Shows accurate scale, position, and viewing angles
- Allows camera navigation around the arena
- Supports all Nationwide Arena display configurations

## Venue Specifications: Nationwide Arena

### Key Display Groups

**Centerhung (Main Scoreboard)**
- Main Video: 4 displays @ 1280x720 (four-sided scoreboard)
- Upper Ring: 3648x128 (wraparound ribbon)
- Scoring Ring: 3104x96
- Lower Ring: 3104x96

**Perimeter**
- Ribbon: 10,512x30 (wraparound fascia ribbon)
- East: 1180x80
- West: 2688x56
- West Aux 1-4: 4 displays @ 640x96

**Towers** (Two tower structures)
- Tower Tops: 2 displays @ 480x260
- Tower Strips A, B, C: 6 displays @ 312x42
- Tower Bottoms: 2 displays @ 608x168

**Vomitories** (Entry tunnels with LED displays)
- Team Tunnels: 2 displays @ 360x180
- Zamboni Tunnel: 765x180
- Lexus Lounge: 3 @ 315x180, 1 @ 225x180
- Lower Vomitory Groups: Various @ 180 height
- Upper Vomitory Groups: Various @ 180 height

**Other**
- LED Dashers: 2 displays @ 432x96 (on-ice boards)
- L Bar Overlay: 169x720 (broadcast overlay, not physical)
- Exterior: 3 @ 1152x192, 2 @ 2176x192

### Content Requirements
- Export: Apple ProRes 422
- Frame Rate: 59.94 fps
- Pixel Aspect: Square
- White backgrounds not recommended
- High contrast required
- Avoid fine detail and low-opacity motion
- Centerhung ring content scrolls max 1 rotation per 30 seconds

### Display Packages (Preset Configurations)
- Ultra Mega Bowl
- Mega Bowl
- Video Boards + East
- West Aux
- Lower Vomitories
- Upper Vomitories
- Event + Concert
- And more...

## Technical Approach

### Platform Decision: Web vs macOS Native

**Web (Three.js / React Three Fiber)** - RECOMMENDED
- Pros:
  - Cross-platform (Mac, Windows, browser)
  - Easier deployment (no app store, instant updates)
  - Rich ecosystem (React, TypeScript, Vite)
  - Good WebGL performance for this use case
  - Easier collaboration (share via URL)

- Cons:
  - Video playback has some browser limitations
  - Slightly less GPU access than native

**macOS Native (Swift + Metal/SceneKit)**
- Pros:
  - Maximum performance
  - Better video codec support
  - Native file system access

- Cons:
  - Mac-only
  - More complex development
  - Deployment friction (signing, updates)
  - Overkill for this use case

**Recommendation: Build web app with Three.js + React Three Fiber**
- Performance is sufficient for video texture mapping
- Faster iteration during development
- Can package as Electron app later if needed
- TypeScript for type safety

## Architecture

### Tech Stack
```
Frontend:
- React 18 + TypeScript
- React Three Fiber (R3F) + Drei
- Vite (build tool)
- Zustand or Jotai (state management)

3D Rendering:
- Three.js (via R3F)
- Video textures for displays
- HDRI environment map (center ice photo)

Video Handling:
- HTML5 video elements
- Canvas for video → texture pipeline
- Support for .mov, .mp4, .webm

UI Controls:
- File drag-and-drop
- Display preset selector
- Camera controls (orbit, fly-through)
- Playback controls (play/pause/scrub all videos)
```

### 3D Scene Structure
```
Scene
├── Environment (HDRI from center ice)
├── Arena Model
│   ├── Bowl Geometry (simplified)
│   ├── Ice Surface
│   └── Seating (low poly)
├── Display Groups
│   ├── Centerhung
│   │   ├── Main Video (4 planes)
│   │   ├── Upper Ring (curved strip)
│   │   ├── Scoring Ring (curved strip)
│   │   └── Lower Ring (curved strip)
│   ├── Ribbon (curved fascia)
│   ├── Towers (2 tower structures)
│   ├── East/West Displays
│   └── Vomitories
└── Camera (orbital controls)
```

### Data Model
```typescript
interface Display {
  id: string;
  name: string;
  resolution: { width: number; height: number };
  position: [x, y, z];
  rotation: [x, y, z];
  scale: [x, y, z];
  geometry: 'plane' | 'curved' | 'cylinder';
  videoSource?: string; // path to video file
  group: DisplayGroup;
}

type DisplayGroup =
  | 'centerhung'
  | 'ribbon'
  | 'towers'
  | 'east-west'
  | 'vomitories'
  | 'dashers';

interface DisplayPackage {
  name: string;
  displays: string[]; // display IDs
}
```

### Key Features

**Phase 1 (MVP)**
- Load arena 3D scene
- Display centerhung main video (4 screens)
- Drag-and-drop video files
- Basic camera orbit controls
- Play/pause all videos in sync

**Phase 2**
- All display groups (ribbon, towers, voms)
- Display package presets
- Independent video playback per display
- Timeline scrubber
- Export/save configurations

**Phase 3**
- Arena geometry from CAD import
- Camera saved positions / presets
- Realistic lighting and reflections
- Video export (render camera path)

## Development Priorities

1. **Speed over perfection**: Get MVP working fast
2. **Real display specs**: Use exact pixel dimensions and positions
3. **Ease of use**: Drag-and-drop everything, minimal UI
4. **Performance**: Smooth 60fps camera movement
5. **Extensibility**: Easy to add new displays or venues

## Key Constraints (from .ai/rules.md)
- Prefer systems over one-offs
- Surface risks early
- No unnecessary dependencies
- Optimize for clarity and debuggability
- End with concrete next steps

## Next Steps
1. Set up Vite + React + TypeScript + R3F project
2. Create basic 3D scene with HDRI environment
3. Build centerhung scoreboard geometry (4 planes)
4. Implement video texture loading
5. Add camera controls

## Questions to Resolve
- Do you want to start with centerhung only, or all displays from the start?
- Should video playback be synchronized across all displays or independent?
- Do you have 3D models of the arena, or should we build simplified geometry?
- Preferred deployment: hosted web app, local server, or Electron desktop app?
