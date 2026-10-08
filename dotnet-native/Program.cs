using Allpaqa.MultilingualKatakana;

// The whole program is wrapped in a try/catch block because the native library
// is loaded on the first call, which is where loading can fail on an unsupported
// platform or when native assets are missing.
try
{
    // === 1. One call ===
    Console.WriteLine("=== One call ===");
    // Katakana.ToKatakana converts multilingual text directly using default options.
    string[] samples =
    [
        "GG! that was amazing",
        "니 목소리 진짜 좋다",
        "你好！谢谢乾爹",
    ];

    foreach (var text in samples)
    {
        Console.WriteLine($"{text}  ->  {Katakana.ToKatakana(text)}");
    }

    Console.WriteLine();

    // === 2. Reusable converter with options ===
    Console.WriteLine("=== Reusable converter with options ===");
    // KatakanaConverter is thread-safe and meant to be reused.
    // Options are snapshotted at construction; modifying the options object later has no effect.
    var options = new KatakanaOptions
    {
        EnableChinese = false,
    };
    var converter = new KatakanaConverter(options);

    const string mixedText = "你好 thank you";
    Console.WriteLine($"{mixedText}  ->  {converter.Convert(mixedText)}");
}
catch (KatakanaException ex) when (ex.StatusCode is null)
{
    // === 3. .NET-specific: if the native library cannot load ===
    // StatusCode is null exactly for load/initialization failures; other codes
    // (1 null pointer, 2 invalid UTF-8, 3 panic in the core) are not load failures
    // and are left to surface.
    // On a supported platform this section prints nothing.
    Console.Error.WriteLine("=== If the native library cannot load ===");
    Console.Error.WriteLine($"The native library could not be loaded on this platform: {ex.Message}");
    return 1;
}

return 0;
