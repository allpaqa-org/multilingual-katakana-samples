using Allpaqa.MultilingualKatakana;

// The entire program is wrapped in a try/catch block to handle KatakanaException.
// The .NET package is native-only (shipping for 9 RIDs) with no managed fallback.
// If the native library cannot be loaded on an unsupported platform or due to a
// missing native asset, KatakanaException is thrown.
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
catch (KatakanaException ex)
{
    // === 3. If the native library cannot load ===
    // On a supported platform this section prints nothing.
    // When the native library fails to load, write an explanatory message to stderr and exit with code 1.
    Console.Error.WriteLine("=== If the native library cannot load ===");
    Console.Error.WriteLine($"The native library could not be loaded on this platform: {ex.Message}");
    Environment.Exit(1);
}
