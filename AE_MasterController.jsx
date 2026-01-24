/*
 * AE Master Controller - 4K Composition with Comprehensive Effects
 * Creates a 4K composition with a master controller null object
 * that drives a huge variety of visual effects
 */

(function() {
    // ==================== CONFIGURATION ====================
    var config = {
        compName: "Master_Controller_4K",
        width: 3840,
        height: 2160,
        pixelAspect: 1,
        duration: 30,
        frameRate: 30
    };

    // ==================== UTILITY FUNCTIONS ====================
    function addSliderControl(layer, name, defaultValue) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        effect.name = name;
        effect.property("Slider").setValue(defaultValue || 0);
        return effect;
    }

    function addCheckboxControl(layer, name, defaultValue) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        effect.name = name;
        effect.property("Checkbox").setValue(defaultValue ? 1 : 0);
        return effect;
    }

    function addColorControl(layer, name, defaultColor) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Color Control");
        effect.name = name;
        effect.property("Color").setValue(defaultColor || [1, 1, 1, 1]);
        return effect;
    }

    function addPointControl(layer, name, defaultPoint) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Point Control");
        effect.name = name;
        effect.property("Point").setValue(defaultPoint || [config.width/2, config.height/2]);
        return effect;
    }

    function addAngleControl(layer, name, defaultAngle) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Angle Control");
        effect.name = name;
        effect.property("Angle").setValue(defaultAngle || 0);
        return effect;
    }

    function addLayerControl(layer, name) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Layer Control");
        effect.name = name;
        return effect;
    }

    // ==================== MAIN SCRIPT ====================
    app.beginUndoGroup("Create Master Controller Comp");

    try {
        // Create the 4K composition
        var comp = app.project.items.addComp(
            config.compName,
            config.width,
            config.height,
            config.pixelAspect,
            config.duration,
            config.frameRate
        );

        // ==================== CREATE MASTER CONTROLLER ====================
        var masterController = comp.layers.addNull();
        masterController.name = "MASTER CONTROLLER";
        masterController.property("Position").setValue([config.width/2, config.height/2]);
        masterController.label = 11; // Purple label

        // ==================== GLOBAL CONTROLS ====================
        addCheckboxControl(masterController, "=== GLOBAL ===", false);
        addSliderControl(masterController, "Master Intensity", 100);
        addCheckboxControl(masterController, "Enable All Effects", true);

        // ==================== COLOR CORRECTION CONTROLS ====================
        addCheckboxControl(masterController, "=== COLOR CORRECTION ===", false);
        addCheckboxControl(masterController, "CC_Enable", true);
        addSliderControl(masterController, "CC_Exposure", 0);
        addSliderControl(masterController, "CC_Contrast", 0);
        addSliderControl(masterController, "CC_Highlights", 0);
        addSliderControl(masterController, "CC_Shadows", 0);
        addSliderControl(masterController, "CC_Saturation", 100);
        addSliderControl(masterController, "CC_Vibrance", 0);
        addSliderControl(masterController, "CC_Temperature", 0);
        addSliderControl(masterController, "CC_Tint", 0);
        addSliderControl(masterController, "CC_Hue", 0);
        addColorControl(masterController, "CC_ColorTint", [1, 1, 1, 1]);
        addSliderControl(masterController, "CC_TintAmount", 0);

        // ==================== BLUR CONTROLS ====================
        addCheckboxControl(masterController, "=== BLUR ===", false);
        addCheckboxControl(masterController, "Blur_Enable", false);
        addSliderControl(masterController, "Blur_Amount", 0);
        addSliderControl(masterController, "Blur_DirectionalAngle", 0);
        addSliderControl(masterController, "Blur_DirectionalAmount", 0);
        addSliderControl(masterController, "Blur_RadialAmount", 0);
        addPointControl(masterController, "Blur_RadialCenter", [config.width/2, config.height/2]);

        // ==================== GLOW CONTROLS ====================
        addCheckboxControl(masterController, "=== GLOW ===", false);
        addCheckboxControl(masterController, "Glow_Enable", false);
        addSliderControl(masterController, "Glow_Threshold", 80);
        addSliderControl(masterController, "Glow_Radius", 50);
        addSliderControl(masterController, "Glow_Intensity", 1);
        addColorControl(masterController, "Glow_ColorA", [1, 0.8, 0.5, 1]);
        addColorControl(masterController, "Glow_ColorB", [1, 0.2, 0.2, 1]);

        // ==================== VIGNETTE CONTROLS ====================
        addCheckboxControl(masterController, "=== VIGNETTE ===", false);
        addCheckboxControl(masterController, "Vignette_Enable", false);
        addSliderControl(masterController, "Vignette_Amount", 50);
        addSliderControl(masterController, "Vignette_Feather", 50);
        addSliderControl(masterController, "Vignette_Size", 80);
        addSliderControl(masterController, "Vignette_Roundness", 100);
        addPointControl(masterController, "Vignette_Center", [config.width/2, config.height/2]);
        addColorControl(masterController, "Vignette_Color", [0, 0, 0, 1]);

        // ==================== CHROMATIC ABERRATION CONTROLS ====================
        addCheckboxControl(masterController, "=== CHROMATIC ABERRATION ===", false);
        addCheckboxControl(masterController, "ChromaAberr_Enable", false);
        addSliderControl(masterController, "ChromaAberr_Amount", 5);
        addSliderControl(masterController, "ChromaAberr_RedShift", 0);
        addSliderControl(masterController, "ChromaAberr_BlueShift", 0);
        addAngleControl(masterController, "ChromaAberr_Angle", 0);
        addPointControl(masterController, "ChromaAberr_Center", [config.width/2, config.height/2]);

        // ==================== FILM GRAIN CONTROLS ====================
        addCheckboxControl(masterController, "=== FILM GRAIN ===", false);
        addCheckboxControl(masterController, "Grain_Enable", false);
        addSliderControl(masterController, "Grain_Amount", 20);
        addSliderControl(masterController, "Grain_Size", 1);
        addSliderControl(masterController, "Grain_Softness", 50);
        addSliderControl(masterController, "Grain_AnimSpeed", 100);
        addCheckboxControl(masterController, "Grain_ColorNoise", false);

        // ==================== SHAKE / CAMERA CONTROLS ====================
        addCheckboxControl(masterController, "=== CAMERA SHAKE ===", false);
        addCheckboxControl(masterController, "Shake_Enable", false);
        addSliderControl(masterController, "Shake_Amount", 20);
        addSliderControl(masterController, "Shake_Speed", 5);
        addSliderControl(masterController, "Shake_Rotation", 0);
        addSliderControl(masterController, "Shake_Scale", 0);
        addSliderControl(masterController, "Shake_Decay", 0);

        // ==================== TRANSFORM CONTROLS ====================
        addCheckboxControl(masterController, "=== TRANSFORM ===", false);
        addSliderControl(masterController, "Transform_PositionX", 0);
        addSliderControl(masterController, "Transform_PositionY", 0);
        addSliderControl(masterController, "Transform_Scale", 100);
        addSliderControl(masterController, "Transform_Rotation", 0);
        addSliderControl(masterController, "Transform_Skew", 0);
        addAngleControl(masterController, "Transform_SkewAxis", 0);

        // ==================== DISTORTION CONTROLS ====================
        addCheckboxControl(masterController, "=== DISTORTION ===", false);
        addCheckboxControl(masterController, "Distort_Enable", false);
        addSliderControl(masterController, "Distort_Bulge", 0);
        addSliderControl(masterController, "Distort_Pinch", 0);
        addSliderControl(masterController, "Distort_Spherize", 0);
        addSliderControl(masterController, "Distort_Wave", 0);
        addSliderControl(masterController, "Distort_WaveSpeed", 1);
        addSliderControl(masterController, "Distort_Turbulence", 0);
        addPointControl(masterController, "Distort_Center", [config.width/2, config.height/2]);

        // ==================== STYLIZE CONTROLS ====================
        addCheckboxControl(masterController, "=== STYLIZE ===", false);
        addCheckboxControl(masterController, "Style_Enable", false);
        addSliderControl(masterController, "Style_Posterize", 0);
        addSliderControl(masterController, "Style_Threshold", 0);
        addSliderControl(masterController, "Style_Mosaic", 0);
        addSliderControl(masterController, "Style_FindEdges", 0);
        addSliderControl(masterController, "Style_Emboss", 0);
        addSliderControl(masterController, "Style_Sharpen", 0);

        // ==================== TRANSITION CONTROLS ====================
        addCheckboxControl(masterController, "=== TRANSITIONS ===", false);
        addSliderControl(masterController, "Trans_FadeIn", 0);
        addSliderControl(masterController, "Trans_FadeOut", 0);
        addSliderControl(masterController, "Trans_ScaleIn", 0);
        addSliderControl(masterController, "Trans_WipeProgress", 0);
        addAngleControl(masterController, "Trans_WipeAngle", 0);
        addSliderControl(masterController, "Trans_WipeFeather", 50);

        // ==================== ANIMATION CONTROLS ====================
        addCheckboxControl(masterController, "=== ANIMATION ===", false);
        addSliderControl(masterController, "Anim_Pulse", 0);
        addSliderControl(masterController, "Anim_PulseSpeed", 2);
        addSliderControl(masterController, "Anim_Breathe", 0);
        addSliderControl(masterController, "Anim_BreatheSpeed", 1);
        addSliderControl(masterController, "Anim_Float", 0);
        addSliderControl(masterController, "Anim_FloatSpeed", 1);

        // ==================== LIGHTING CONTROLS ====================
        addCheckboxControl(masterController, "=== LIGHTING ===", false);
        addCheckboxControl(masterController, "Light_Enable", false);
        addPointControl(masterController, "Light_Position", [config.width * 0.3, config.height * 0.3]);
        addSliderControl(masterController, "Light_Intensity", 100);
        addSliderControl(masterController, "Light_Radius", 500);
        addSliderControl(masterController, "Light_Falloff", 50);
        addColorControl(masterController, "Light_Color", [1, 0.95, 0.8, 1]);
        addSliderControl(masterController, "Light_Ambient", 20);

        // ==================== MASKS & MATTES CONTROLS ====================
        addCheckboxControl(masterController, "=== MASKS ===", false);
        addSliderControl(masterController, "Mask_FeatherAll", 0);
        addSliderControl(masterController, "Mask_ExpansionAll", 0);
        addSliderControl(masterController, "Mask_OpacityAll", 100);

        // ==================== TIME CONTROLS ====================
        addCheckboxControl(masterController, "=== TIME ===", false);
        addSliderControl(masterController, "Time_Speed", 100);
        addSliderControl(masterController, "Time_MotionBlur", 0);
        addCheckboxControl(masterController, "Time_Reverse", false);
        addSliderControl(masterController, "Time_Echo", 0);
        addSliderControl(masterController, "Time_EchoDecay", 50);

        // ==================== 3D CONTROLS ====================
        addCheckboxControl(masterController, "=== 3D ===", false);
        addSliderControl(masterController, "3D_RotationX", 0);
        addSliderControl(masterController, "3D_RotationY", 0);
        addSliderControl(masterController, "3D_RotationZ", 0);
        addSliderControl(masterController, "3D_Perspective", 0);
        addPointControl(masterController, "3D_VanishingPoint", [config.width/2, config.height/2]);

        // ==================== PARTICLE CONTROLS ====================
        addCheckboxControl(masterController, "=== PARTICLES ===", false);
        addSliderControl(masterController, "Particle_Amount", 0);
        addSliderControl(masterController, "Particle_Size", 5);
        addSliderControl(masterController, "Particle_Speed", 50);
        addSliderControl(masterController, "Particle_Gravity", 0);
        addSliderControl(masterController, "Particle_Wind", 0);
        addColorControl(masterController, "Particle_Color", [1, 1, 1, 1]);

        // ==================== CREATE BACKGROUND LAYER ====================
        var bgSolid = comp.layers.addSolid([0.1, 0.1, 0.15], "Background", config.width, config.height, 1);
        bgSolid.moveToEnd();
        bgSolid.locked = true;

        // ==================== CREATE ADJUSTMENT LAYER FOR EFFECTS ====================
        var adjustmentLayer = comp.layers.addSolid([1, 1, 1], "Effects_Adjustment", config.width, config.height, 1);
        adjustmentLayer.adjustmentLayer = true;
        adjustmentLayer.moveAfter(masterController);
        adjustmentLayer.label = 14; // Cyan label

        // Add Curves effect for color correction
        var curvesEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE CurvesCustom");
        curvesEffect.name = "CC_Curves";

        // Add Exposure effect
        var exposureEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Exposure2");
        exposureEffect.name = "CC_Exposure";
        exposureEffect.property("Exposure").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("CC_Exposure")("Slider") / 10';

        // Add Hue/Saturation effect
        var hueSatEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE HUE SATURATION");
        hueSatEffect.name = "CC_HueSat";
        hueSatEffect.property("Master Saturation").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("CC_Saturation")("Slider") - 100';
        hueSatEffect.property("Master Hue").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("CC_Hue")("Slider")';

        // Add Tint effect for color tinting
        var tintEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Tint");
        tintEffect.name = "CC_Tint";
        tintEffect.property("Map Black To").setValue([0, 0, 0, 1]);
        tintEffect.property("Map White To").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("CC_ColorTint")("Color")';
        tintEffect.property("Amount to Tint").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("CC_TintAmount")("Slider")';

        // Add Gaussian Blur
        var blurEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
        blurEffect.name = "Blur_Gaussian";
        blurEffect.property("Blurriness").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Blur_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Blur_Amount")("Slider") : 0';

        // Add Directional Blur
        var dirBlurEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Motion Blur");
        dirBlurEffect.name = "Blur_Directional";
        dirBlurEffect.property("Angle").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Blur_DirectionalAngle")("Slider")';
        dirBlurEffect.property("Blur Length").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Blur_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Blur_DirectionalAmount")("Slider") : 0';

        // Add Glow effect
        var glowEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Glo2");
        glowEffect.name = "Glow";
        glowEffect.property("Glow Threshold").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Glow_Threshold")("Slider") / 100';
        glowEffect.property("Glow Radius").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Glow_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Glow_Radius")("Slider") : 0';
        glowEffect.property("Glow Intensity").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Glow_Intensity")("Slider")';
        glowEffect.property("Color A").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Glow_ColorA")("Color")';
        glowEffect.property("Color B").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Glow_ColorB")("Color")';

        // Add Vignette (using CC Vignette or Lumetri-style approach)
        var vignetteEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Radial Wipe");
        vignetteEffect.name = "Vignette";
        vignetteEffect.enabled = false; // We'll use a different approach

        // Create vignette using a solid with radial gradient
        var vignetteLayer = comp.layers.addSolid([0, 0, 0], "Vignette_Layer", config.width, config.height, 1);
        vignetteLayer.moveAfter(adjustmentLayer);
        vignetteLayer.blendingMode = BlendingMode.MULTIPLY;
        vignetteLayer.label = 1; // Red label

        // Add ellipse mask for vignette
        var vignetteMask = vignetteLayer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var vignetteShape = new Shape();
        vignetteShape.vertices = [[0, config.height/2], [config.width/2, 0], [config.width, config.height/2], [config.width/2, config.height]];
        vignetteShape.inTangents = [[0, config.height * 0.28], [-config.width * 0.28, 0], [0, -config.height * 0.28], [config.width * 0.28, 0]];
        vignetteShape.outTangents = [[0, -config.height * 0.28], [config.width * 0.28, 0], [0, config.height * 0.28], [-config.width * 0.28, 0]];
        vignetteShape.closed = true;
        vignetteMask.property("ADBE Mask Shape").setValue(vignetteShape);
        vignetteMask.property("ADBE Mask Mode").setValue(MaskMode.SUBTRACT);
        vignetteMask.property("ADBE Mask Feather").expression =
            '[thisComp.layer("MASTER CONTROLLER").effect("Vignette_Feather")("Slider") * 10, ' +
            'thisComp.layer("MASTER CONTROLLER").effect("Vignette_Feather")("Slider") * 10]';
        vignetteMask.property("ADBE Mask Opacity").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Vignette_Enable")("Checkbox") ? ' +
            'thisComp.layer("MASTER CONTROLLER").effect("Vignette_Amount")("Slider") : 0';

        // Add Noise for Film Grain
        var noiseEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
        noiseEffect.name = "Film_Grain";
        noiseEffect.property("Fractal Type").setValue(1); // Basic
        noiseEffect.property("Noise Type").setValue(2); // Soft Linear
        noiseEffect.property("Contrast").setValue(50);
        noiseEffect.property("Brightness").setValue(-50);
        noiseEffect.property("Scale").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Grain_Size")("Slider") * 100';
        noiseEffect.property("Complexity").setValue(1);
        noiseEffect.property("Evolution").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Grain_Enable")("Checkbox");\n' +
            'enabled ? time * thisComp.layer("MASTER CONTROLLER").effect("Grain_AnimSpeed")("Slider") * 10 : 0';
        noiseEffect.property("Blending Mode").setValue(11); // Soft Light
        noiseEffect.property("Opacity").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Grain_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Grain_Amount")("Slider") : 0';

        // Add Sharpen effect
        var sharpenEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Unsharp Mask2");
        sharpenEffect.name = "Sharpen";
        sharpenEffect.property("Amount").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Style_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Style_Sharpen")("Slider") : 0';

        // Add Find Edges for stylize
        var edgesEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Find Edges");
        edgesEffect.name = "FindEdges";
        edgesEffect.property("Blend With Original").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Style_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("Style_FindEdges")("Slider");\n' +
            'enabled ? 100 - amount : 100';

        // Add Posterize for stylize
        var posterizeEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Posterize");
        posterizeEffect.name = "Posterize";
        posterizeEffect.property("Level").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Style_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("Style_Posterize")("Slider");\n' +
            'enabled && amount > 0 ? Math.max(2, 256 - amount * 2.5) : 256';

        // Add Bulge for distortion
        var bulgeEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Bulge");
        bulgeEffect.name = "Distort_Bulge";
        bulgeEffect.property("Bulge Center").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Distort_Center")("Point")';
        bulgeEffect.property("Bulge Height").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Distort_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Distort_Bulge")("Slider") / 50 : 0';

        // Add Spherize for distortion
        var spherizeEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE SPHERIZE");
        spherizeEffect.name = "Distort_Spherize";
        spherizeEffect.property("Radius").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Distort_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Distort_Spherize")("Slider") * 3 : 0';
        spherizeEffect.property("Center of Sphere").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Distort_Center")("Point")';

        // Add Turbulent Displace for distortion
        var turbulentEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Turbulent Displace");
        turbulentEffect.name = "Distort_Turbulent";
        turbulentEffect.property("Amount").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Distort_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Distort_Turbulence")("Slider") : 0';
        turbulentEffect.property("Size").setValue(100);
        turbulentEffect.property("Evolution").expression = 'time * 100';

        // Add Wave Warp for distortion
        var waveEffect = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Wave Warp");
        waveEffect.name = "Distort_Wave";
        waveEffect.property("Wave Height").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Distort_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Distort_Wave")("Slider") : 0';
        waveEffect.property("Wave Speed").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Distort_WaveSpeed")("Slider")';

        // ==================== CREATE SHAKE/CAMERA NULL ====================
        var shakeNull = comp.layers.addNull();
        shakeNull.name = "Camera_Shake_Null";
        shakeNull.moveAfter(vignetteLayer);
        shakeNull.label = 8; // Fuchsia

        // Set up shake expressions on the null
        shakeNull.property("Position").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Shake_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("Shake_Amount")("Slider");\n' +
            'var speed = thisComp.layer("MASTER CONTROLLER").effect("Shake_Speed")("Slider");\n' +
            'var decay = thisComp.layer("MASTER CONTROLLER").effect("Shake_Decay")("Slider") / 100;\n' +
            'var decayFactor = Math.max(0, 1 - (time / thisLayer.outPoint) * decay);\n' +
            'if (enabled && amount > 0) {\n' +
            '  var x = thisComp.width/2 + wiggle(speed, amount * decayFactor)[0] - thisComp.width/2;\n' +
            '  var y = thisComp.height/2 + wiggle(speed * 0.9, amount * decayFactor)[1] - thisComp.height/2;\n' +
            '  [thisComp.width/2 + (x - thisComp.width/2), thisComp.height/2 + (y - thisComp.height/2)];\n' +
            '} else {\n' +
            '  [thisComp.width/2, thisComp.height/2];\n' +
            '}';

        shakeNull.property("Rotation").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Shake_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("Shake_Rotation")("Slider");\n' +
            'var speed = thisComp.layer("MASTER CONTROLLER").effect("Shake_Speed")("Slider");\n' +
            'enabled ? wiggle(speed * 0.5, amount) : 0';

        shakeNull.property("Scale").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Shake_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("Shake_Scale")("Slider");\n' +
            'var speed = thisComp.layer("MASTER CONTROLLER").effect("Shake_Speed")("Slider");\n' +
            'if (enabled && amount > 0) {\n' +
            '  var s = 100 + wiggle(speed * 0.3, amount)[0] - 100;\n' +
            '  [100 + (s - 100), 100 + (s - 100)];\n' +
            '} else {\n' +
            '  [100, 100];\n' +
            '}';

        // ==================== CREATE LIGHT LAYER ====================
        var lightLayer = comp.layers.addSolid([1, 1, 1], "Light_Overlay", config.width, config.height, 1);
        lightLayer.moveAfter(shakeNull);
        lightLayer.blendingMode = BlendingMode.ADD;
        lightLayer.label = 9; // Yellow

        // Add radial gradient for lighting
        var gradientEffect = lightLayer.property("ADBE Effect Parade").addProperty("ADBE Ramp");
        gradientEffect.name = "Light_Gradient";
        gradientEffect.property("Start of Ramp").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Light_Position")("Point")';
        gradientEffect.property("Start Color").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Light_Color")("Color")';
        gradientEffect.property("End of Ramp").expression =
            'var center = thisComp.layer("MASTER CONTROLLER").effect("Light_Position")("Point");\n' +
            'var radius = thisComp.layer("MASTER CONTROLLER").effect("Light_Radius")("Slider");\n' +
            '[center[0] + radius, center[1] + radius]';
        gradientEffect.property("End Color").setValue([0, 0, 0, 1]);
        gradientEffect.property("Ramp Shape").setValue(2); // Radial

        lightLayer.property("Opacity").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("Light_Enable")("Checkbox");\n' +
            'enabled ? thisComp.layer("MASTER CONTROLLER").effect("Light_Intensity")("Slider") / 2 : 0';

        // ==================== CREATE CHROMATIC ABERRATION SETUP ====================
        // Create three solid layers for RGB channels
        var redChannel = comp.layers.addSolid([1, 0, 0], "ChromaAberr_Red", config.width, config.height, 1);
        var greenChannel = comp.layers.addSolid([0, 1, 0], "ChromaAberr_Green", config.width, config.height, 1);
        var blueChannel = comp.layers.addSolid([0, 0, 1], "ChromaAberr_Blue", config.width, config.height, 1);

        // Group them together
        redChannel.moveAfter(lightLayer);
        greenChannel.moveAfter(redChannel);
        blueChannel.moveAfter(greenChannel);

        // Set blend modes (these create a chromatic aberration look when layers are offset)
        redChannel.blendingMode = BlendingMode.ADD;
        greenChannel.blendingMode = BlendingMode.ADD;
        blueChannel.blendingMode = BlendingMode.ADD;

        // Initially disable - user needs to set up with Set Matte
        redChannel.enabled = false;
        greenChannel.enabled = false;
        blueChannel.enabled = false;

        // Add transform expressions
        redChannel.property("Position").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Amount")("Slider");\n' +
            'var shift = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_RedShift")("Slider");\n' +
            'var angle = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Angle")("Angle") * Math.PI / 180;\n' +
            'var center = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Center")("Point");\n' +
            'if (enabled) {\n' +
            '  var offset = (amount + shift);\n' +
            '  [center[0] + Math.cos(angle) * offset, center[1] + Math.sin(angle) * offset];\n' +
            '} else {\n' +
            '  center;\n' +
            '}';

        blueChannel.property("Position").expression =
            'var enabled = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Enable")("Checkbox");\n' +
            'var amount = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Amount")("Slider");\n' +
            'var shift = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_BlueShift")("Slider");\n' +
            'var angle = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Angle")("Angle") * Math.PI / 180;\n' +
            'var center = thisComp.layer("MASTER CONTROLLER").effect("ChromaAberr_Center")("Point");\n' +
            'if (enabled) {\n' +
            '  var offset = -(amount + shift);\n' +
            '  [center[0] + Math.cos(angle) * offset, center[1] + Math.sin(angle) * offset];\n' +
            '} else {\n' +
            '  center;\n' +
            '}';

        // ==================== ADJUSTMENT LAYER OPACITY ====================
        adjustmentLayer.property("Opacity").expression =
            'thisComp.layer("MASTER CONTROLLER").effect("Master Intensity")("Slider")';

        // ==================== CREATE HELPER TEXT LAYER ====================
        var infoText = comp.layers.addText("MASTER CONTROLLER COMP\n\nSelect the 'MASTER CONTROLLER' layer\nto access all effect controls.\n\nDrop your footage below the adjustment layer.\nParent layers to 'Camera_Shake_Null' for shake effects.");
        infoText.name = "Info_Text";
        infoText.property("Position").setValue([config.width/2, config.height/2]);
        infoText.moveAfter(blueChannel);

        var textProp = infoText.property("ADBE Text Properties").property("ADBE Text Document");
        var textDocument = textProp.value;
        textDocument.resetCharStyle();
        textDocument.fontSize = 60;
        textDocument.fillColor = [0.7, 0.7, 0.7];
        textDocument.font = "Arial";
        textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
        textProp.setValue(textDocument);

        // ==================== ADD GUIDE MARKERS ====================
        var markerProperty = comp.markerProperty;
        var marker1 = new MarkerValue("Intro Zone");
        markerProperty.setValueAtTime(0, marker1);
        var marker2 = new MarkerValue("Mid Point");
        markerProperty.setValueAtTime(config.duration / 2, marker2);
        var marker3 = new MarkerValue("Outro Zone");
        markerProperty.setValueAtTime(config.duration - 5, marker3);

        // ==================== FINAL SETUP ====================
        // Select the master controller for easy access
        masterController.selected = true;
        comp.openInViewer();

        alert("Master Controller 4K Composition Created!\n\n" +
              "Composition: " + config.width + "x" + config.height + " @ " + config.frameRate + "fps\n" +
              "Duration: " + config.duration + " seconds\n\n" +
              "The MASTER CONTROLLER null contains all effect controls:\n" +
              "• Color Correction (Exposure, Saturation, Hue, Tint, etc.)\n" +
              "• Blur Effects (Gaussian, Directional, Radial)\n" +
              "• Glow & Light Effects\n" +
              "• Vignette\n" +
              "• Chromatic Aberration\n" +
              "• Film Grain\n" +
              "• Camera Shake\n" +
              "• Distortion (Bulge, Spherize, Wave, Turbulence)\n" +
              "• Stylize (Posterize, Find Edges, Sharpen)\n" +
              "• Transform Controls\n" +
              "• Transitions\n" +
              "• Animation Presets\n" +
              "• Lighting\n" +
              "• 3D Controls\n" +
              "• Particle System Controls\n\n" +
              "Drop your footage below the Effects_Adjustment layer.\n" +
              "Parent layers to Camera_Shake_Null for shake effects.");

    } catch (e) {
        alert("Error creating composition:\n" + e.toString());
    }

    app.endUndoGroup();
})();
