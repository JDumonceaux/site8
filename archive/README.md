# Archive Directory

This directory contains archived code and files that are no longer actively used in the project but are preserved for historical reference.

## Contents

### `unused-client-src-2025-12-27/`

**Archived:** December 27, 2025  
**Original Location:** `client/src/unused/`  
**Reason:** Cleanup of experimental and unused code as part of codebase structural improvements

**What's Archived:**

- Experimental home screen implementations (HomeScreen1-4)
- Canvas animation experiments (Ball, Canvas, Text3D, Floor)
- Custom graphics components (PinkGraphic)
- Unused custom hooks (useCanvas)
- Associated CSS files for animations

**Contents Summary:**

- `features/home/` - Alternative home screen implementations
- `features/animations/` - Canvas and 3D animation experiments

**Status:** These files were experimental features and animation prototypes that were not integrated into the main application. They are preserved here for reference but should not be imported or used in active code.

## Archiving Guidelines

When archiving code:

1. Create a descriptive directory name with date: `<description>-YYYY-MM-DD`
2. Document the archive in this README
3. Remove from active codebase
4. Ensure no active imports reference archived code
5. Include reason for archiving and original location

## Restoration

If archived code needs to be restored:

1. Review the original code carefully
2. Update dependencies and patterns to match current standards
3. Test thoroughly before integrating
4. Consider if the functionality can be implemented better with current patterns
