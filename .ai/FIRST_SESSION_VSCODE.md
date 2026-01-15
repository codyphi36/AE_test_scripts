# First Session in VS Code - Quick Start

Copy/paste this into Claude when you first open the project in VS Code:

---

```
I'm taking over this project from Claude Code CLI. Please read these files to get up to speed:

1. .ai/claude.md - Project context
2. PROJECT_SUMMARY.md - Full build history
3. HANDOFF_TO_VSCODE.md - Transition details

Then give me:
- A summary of what's built
- Current status (what works, what doesn't)
- What's next to implement
- Any issues I should know about
```

---

## Expected Response

Claude should tell you:

✅ **What Works:**
- 3D arena viewer with centerhung + ribbon displays
- Video texture mapping system
- Synchronized playback controls
- Codec detection (warns about ProRes)

⚠️ **Known Issues:**
- ProRes/MOV files don't work (browsers can't decode them for WebGL)
- Solution: Convert to H.264 MP4 (see VIDEO_CONVERSION.md)

📋 **What's Next:**
- Add tower displays (specs in UltraMegaBowl_v5.0.jsx)
- Add vomitory displays
- Add HDRI environment from center ice photo
- Camera preset positions

## Typical Follow-up Questions

After the initial briefing, you might ask:

```
"Show me how the shared video system works for the 4-sided scoreboard"
```

```
"I want to add the north and south tower displays. Where should I start?"
```

```
"Walk me through the video texture pipeline - from file upload to Three.js"
```

Claude will have full context from the docs and can explain any part of the system.

## Pro Tips

### Reference Documentation Explicitly
Instead of: "How does the ribbon work?"
Better: "In src/components/CurvedDisplay.tsx, explain why we use CylinderGeometry"

### Use @filename Mentions
In VS Code, you can type `@` to reference files:
- `@displays.ts` - Jump to display configs
- `@ArenaScene.tsx` - Jump to main scene
- `@claude.md` - Reference project docs

### Update .ai/tasks.md
As you add features, update `.ai/tasks.md` so Claude knows what's current:

```markdown
## Current Focus
- [ ] Add tower displays (north + south)

## Completed
- [x] Centerhung main video (4-sided)
- [x] Centerhung rings (upper, scoring, lower)
- [x] Ribbon display
- [x] Codec detection
```

This keeps context accurate across sessions.
