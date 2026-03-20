//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

uniform float perlinScale;
uniform float frequency;
uniform float uTime;
uniform float animSpeed;
uniform float scalePulse;
uniform float freqPulse;
uniform float colorTweak;
uniform float enableColor;
uniform float sharpness;

varying vec2 vUv;

void main()
{
    float t = uTime * animSpeed;

    // Wobble domain scale around center — detail density breathes, no sliding
    float scaleMod = 1.0 + scalePulse * sin(t);
    vec2 p = (vUv - 0.5) * perlinScale * scaleMod;

    // Wobble how strongly sin() wraps the noise — banding / contrast pulses
    float freqMod = frequency * (1.0 + freqPulse * sin(t * 1.27 + 0.7));

    float raw = sin(cnoise(p) * freqMod);
    // 0 = smooth sine; higher sharpness → pow toward ±1 (crisper bands, less mush)
    float e = mix(1.0, 0.08, clamp(sharpness, 0.0, 1.0));
    float strength = sign(raw) * pow(abs(raw), e);

    // Color
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, colorTweak);
    float mask = strength * 0.5 + 0.5;
    vec3 mixedColor = mix(blackColor, uvColor, mask);
    vec3 strengthOnly = vec3(strength);
    vec3 outColor = mix(strengthOnly, mixedColor, enableColor);

    gl_FragColor = vec4(outColor, 1.0);
}