# dotnet-native sample

This sample shows how to use the `Allpaqa.MultilingualKatakana` NuGet package in C# (.NET 10).

- **One call convenience:** `Katakana.ToKatakana(text)` converts multilingual text directly using default options.
- **Reusable converter with options:** `KatakanaConverter` is instantiated once with custom `KatakanaOptions` (e.g. `EnableChinese = false`). Options are snapshotted at construction, and the converter instance is thread-safe and meant to be reused across threads.
- **Native-only package with no managed fallback:** native assets ship for 9 RIDs (`win-x64`, `win-x86`, `win-arm64`, `linux-x64`, `linux-arm64`, `linux-musl-x64`, `linux-musl-arm64`, `osx-x64`, `osx-arm64`); the package is native-only with no managed fallback, so an unsupported platform raises `KatakanaException`.

For the full API reference and options details, see the [package README](https://github.com/allpaqa-org/multilingual-katakana/blob/main/bindings/dotnet/README.md).

## Requirements

- [.NET 10 SDK](https://dotnet.microsoft.com/)

## Install

The project file already references the package pinned to exactly 0.5.0:

```xml
<PackageReference Include="Allpaqa.MultilingualKatakana" Version="[0.5.0]" />
```

To add the package to your own project, use `dotnet add package Allpaqa.MultilingualKatakana`.

## Run

From this directory:

```bash
dotnet run
```

From the repository root:

```bash
dotnet run --project dotnet-native
```
