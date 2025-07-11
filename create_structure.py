import os

folders = [
    "assets/logos",
    "assets/mockups",
    "assets/colors",
    "docs/demo/nyc-jail-system/demo-flows",
    "docs/demo/nyc-jail-system/ai-capabilities",
    "docs/architecture",
    "docs/compliance/matrices",
    "docs/templates",
    "ui-design/components",
    "ui-design/layouts",
    "ui-design/interactions"
]

files = [
    "README.md",
    "code-droid-prompt.md",
    "docs/demo/nyc-jail-system/overview.md",
    "docs/demo/nyc-jail-system/sandbox-setup.md",
    "docs/demo/nyc-jail-system/document-types.md",
    "docs/demo/nyc-jail-system/regulatory-framework.md",
    "docs/demo/nyc-jail-system/presentation-guide.md",
    "docs/demo/nyc-jail-system/ai-capabilities/report-generation.md",
    "docs/templates/general-doc-template.md",
    "docs/templates/compliance-matrix-template.json"
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

for file in files:
    if not os.path.exists(file):
        with open(file, "w") as f:
            f.write(f"# {os.path.basename(file)}\n")
