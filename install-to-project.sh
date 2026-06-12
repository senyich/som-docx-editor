#!/bin/bash

# Скрипт установки @som/docx-editor пакетов в vendor целевого проекта
# Использование: ./install-to-project.sh /path/to/your/react-project

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Путь к корню репозитория docx-editor
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Проверка аргументов
if [ $# -eq 0 ]; then
    echo -e "${RED}Ошибка: Не указан путь к целевому проекту${NC}"
    echo "Использование: $0 /path/to/your/react-project"
    exit 1
fi

TARGET_PROJECT="$1"

# Проверка существования целевого проекта
if [ ! -d "$TARGET_PROJECT" ]; then
    echo -e "${RED}Ошибка: Директория '$TARGET_PROJECT' не существует${NC}"
    exit 1
fi

# Проверка существования package.json в целевом проекте
if [ ! -f "$TARGET_PROJECT/package.json" ]; then
    echo -e "${YELLOW}Предупреждение: В '$TARGET_PROJECT' не найден package.json${NC}"
    read -p "Продолжить anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${BLUE}=== Установка @som/docx-editor в $TARGET_PROJECT ===${NC}"

# Проверка собранных пакетов
PACKAGES=("i18n" "core" "react")
for pkg in "${PACKAGES[@]}"; do
    if [ ! -d "$REPO_ROOT/packages/$pkg/dist" ]; then
        echo -e "${RED}Ошибка: Пакет '$pkg' не собран (отсутствует dist)${NC}"
        echo "Запусти сборку: bun run build:packages"
        exit 1
    fi
done

# Создание директории vendor
VENDOR_DIR="$TARGET_PROJECT/vendor/@som"
echo -e "${BLUE}Создание директории $VENDOR_DIR...${NC}"
mkdir -p "$VENDOR_DIR"

# Копирование и настройка пакетов
copy_package() {
    local pkg_name=$1
    local pkg_dir=$2
    local exports=$3
    local peer_deps=$4
    local side_effects=$5

    local target_dir="$VENDOR_DIR/$pkg_dir"

    echo -e "${BLUE}Копирование $pkg_name...${NC}"

    # Очистка старой версии
    rm -rf "$target_dir"
    mkdir -p "$target_dir"

    # Копирование dist файлов
    cp -r "$REPO_ROOT/packages/$pkg_name/dist/"* "$target_dir/"

    # Создание package.json
    cat > "$target_dir/package.json" << EOF
{
  "name": "@som/$pkg_dir",
  "version": "1.2.1",
  "description": "DOCX Editor $pkg_name package (vendor)",
  "sideEffects": ${side_effects},
  "main": "./index.js",
  "module": "./index.mjs",
  "types": "./index.d.ts",
  "exports": ${exports},
  "peerDependencies": ${peer_deps}
}
EOF

    echo -e "${GREEN}✓ $pkg_name установлен${NC}"
}

# I18N пакет
copy_package "i18n" "docx-editor-i18n" '{
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    },
    "./en": { "types": "./en.d.ts", "import": "./en.mjs", "require": "./en.js" },
    "./de": { "types": "./de.d.ts", "import": "./de.mjs", "require": "./de.js" },
    "./fr": { "types": "./fr.d.ts", "import": "./fr.mjs", "require": "./fr.js" },
    "./he": { "types": "./he.d.ts", "import": "./he.mjs", "require": "./he.js" },
    "./hi": { "types": "./hi.d.ts", "import": "./hi.mjs", "require": "./hi.js" },
    "./pl": { "types": "./pl.d.ts", "import": "./pl.mjs", "require": "./pl.js" },
    "./pt-BR": { "types": "./pt-BR.d.ts", "import": "./pt-BR.mjs", "require": "./pt-BR.js" },
    "./ru": { "types": "./ru.d.ts", "import": "./ru.mjs", "require": "./ru.js" },
    "./tr": { "types": "./tr.d.ts", "import": "./tr.mjs", "require": "./tr.js" },
    "./zh-CN": { "types": "./zh-CN.d.ts", "import": "./zh-CN.mjs", "require": "./zh-CN.js" }
  }' '{
    "typescript": "^5.0.0"
  }' 'false'

# Core пакет
copy_package "core" "docx-editor-core" '{
    ".": {
      "types": "./core.d.ts",
      "import": "./core.mjs",
      "require": "./core.js"
    },
    "./headless": {
      "types": "./headless.d.ts",
      "import": "./headless.mjs",
      "require": "./headless.js"
    },
    "./core-plugins": {
      "types": "./core-plugins.d.ts",
      "import": "./core-plugins.mjs",
      "require": "./core-plugins.js"
    },
    "./mcp": {
      "types": "./mcp.d.ts",
      "import": "./mcp.mjs",
      "require": "./mcp.js"
    },
    "./prosemirror": {
      "types": "./prosemirror/index.d.ts",
      "import": "./prosemirror/index.mjs",
      "require": "./prosemirror/index.js"
    },
    "./prosemirror/extensions": {
      "types": "./prosemirror/extensions/index.d.ts",
      "import": "./prosemirror/extensions/index.mjs",
      "require": "./prosemirror/extensions/index.js"
    },
    "./prosemirror/conversion": {
      "types": "./prosemirror/conversion/index.d.ts",
      "import": "./prosemirror/conversion/index.mjs",
      "require": "./prosemirror/conversion/index.js"
    },
    "./prosemirror/commands": {
      "types": "./prosemirror/commands/index.d.ts",
      "import": "./prosemirror/commands/index.mjs",
      "require": "./prosemirror/commands/index.js"
    },
    "./prosemirror/plugins": {
      "types": "./prosemirror/plugins/index.d.ts",
      "import": "./prosemirror/plugins/index.mjs",
      "require": "./prosemirror/plugins/index.js"
    },
    "./prosemirror/schema": {
      "types": "./prosemirror/schema/index.d.ts",
      "import": "./prosemirror/schema/index.mjs",
      "require": "./prosemirror/schema/index.js"
    },
    "./prosemirror/styles": {
      "types": "./prosemirror/styles/index.d.ts",
      "import": "./prosemirror/styles/index.mjs",
      "require": "./prosemirror/styles/index.js"
    },
    "./prosemirror/utils/ClickPositionResolver": {
      "types": "./prosemirror/utils/ClickPositionResolver.d.ts",
      "import": "./prosemirror/utils/ClickPositionResolver.mjs",
      "require": "./prosemirror/utils/ClickPositionResolver.js"
    },
    "./prosemirror/utils/extractTrackedChanges": {
      "types": "./prosemirror/utils/extractTrackedChanges.d.ts",
      "import": "./prosemirror/utils/extractTrackedChanges.mjs",
      "require": "./prosemirror/utils/extractTrackedChanges.js"
    },
    "./prosemirror/template/prosemirror-plugin": {
      "types": "./prosemirror/template/prosemirror-plugin.d.ts",
      "import": "./prosemirror/template/prosemirror-plugin.mjs",
      "require": "./prosemirror/template/prosemirror-plugin.js"
    },
    "./prosemirror/extensions/nodes/TableExtension": {
      "types": "./prosemirror/extensions/nodes/TableExtension.d.ts",
      "import": "./prosemirror/extensions/nodes/TableExtension.mjs",
      "require": "./prosemirror/extensions/nodes/TableExtension.js"
    },
    "./prosemirror/editor.css": "./prosemirror/editor.css",
    "./docx": {
      "types": "./docx/index.d.ts",
      "import": "./docx/index.mjs",
      "require": "./docx/index.js"
    },
    "./docx/wrapTypes": {
      "types": "./docx/wrapTypes.d.ts",
      "import": "./docx/wrapTypes.mjs",
      "require": "./docx/wrapTypes.js"
    },
    "./docx/serializer": {
      "types": "./docx/serializer/index.d.ts",
      "import": "./docx/serializer/index.mjs",
      "require": "./docx/serializer/index.js"
    },
    "./docx/parser": {
      "types": "./docx/parser.d.ts",
      "import": "./docx/parser.mjs",
      "require": "./docx/parser.js"
    },
    "./docx/rezip": {
      "types": "./docx/rezip.d.ts",
      "import": "./docx/rezip.mjs",
      "require": "./docx/rezip.js"
    },
    "./agent": {
      "types": "./agent/index.d.ts",
      "import": "./agent/index.mjs",
      "require": "./agent/index.js"
    },
    "./layout-engine": {
      "types": "./layout-engine/index.d.ts",
      "import": "./layout-engine/index.mjs",
      "require": "./layout-engine/index.js"
    },
    "./layout-engine/types": {
      "types": "./layout-engine/types.d.ts",
      "import": "./layout-engine/types.mjs",
      "require": "./layout-engine/types.js"
    },
    "./layout-painter": {
      "types": "./layout-painter/index.d.ts",
      "import": "./layout-painter/index.mjs",
      "require": "./layout-painter/index.js"
    },
    "./layout-painter/renderPage": {
      "types": "./layout-painter/renderPage.d.ts",
      "import": "./layout-painter/renderPage.mjs",
      "require": "./layout-painter/renderPage.js"
    },
    "./layout-bridge": {
      "types": "./layout-bridge/index.d.ts",
      "import": "./layout-bridge/index.mjs",
      "require": "./layout-bridge/index.js"
    },
    "./layout-bridge/measuring": {
      "types": "./layout-bridge/measuring/index.d.ts",
      "import": "./layout-bridge/measuring/index.mjs",
      "require": "./layout-bridge/measuring/index.js"
    },
    "./plugin-api": {
      "types": "./plugin-api/index.d.ts",
      "import": "./plugin-api/index.mjs",
      "require": "./plugin-api/index.js"
    },
    "./plugin-api/RenderedDomContext": {
      "types": "./plugin-api/RenderedDomContext.d.ts",
      "import": "./plugin-api/RenderedDomContext.mjs",
      "require": "./plugin-api/RenderedDomContext.js"
    },
    "./plugin-api/resolveItemPositions": {
      "types": "./plugin-api/resolveItemPositions.d.ts",
      "import": "./plugin-api/resolveItemPositions.mjs",
      "require": "./plugin-api/resolveItemPositions.js"
    },
    "./plugin-api/types": {
      "types": "./plugin-api/types.d.ts",
      "import": "./plugin-api/types.mjs",
      "require": "./plugin-api/types.js"
    },
    "./types/document": {
      "types": "./types/document.d.ts",
      "import": "./types/document.mjs",
      "require": "./types/document.js"
    },
    "./types/content": {
      "types": "./types/content.d.ts",
      "import": "./types/content.mjs",
      "require": "./types/content.js"
    },
    "./types/agentApi": {
      "types": "./types/agentApi.d.ts",
      "import": "./types/agentApi.mjs",
      "require": "./types/agentApi.js"
    },
    "./utils": {
      "types": "./utils/index.d.ts",
      "import": "./utils/index.mjs",
      "require": "./utils/index.js"
    },
    "./utils/cardStyles": {
      "types": "./utils/cardStyles.d.ts",
      "import": "./utils/cardStyles.mjs",
      "require": "./utils/cardStyles.js"
    },
    "./utils/comments": {
      "types": "./utils/comments.d.ts",
      "import": "./utils/comments.mjs",
      "require": "./utils/comments.js"
    },
    "./utils/findReplace": {
      "types": "./utils/findReplace.d.ts",
      "import": "./utils/findReplace.mjs",
      "require": "./utils/findReplace.js"
    },
    "./utils/headingCollector": {
      "types": "./utils/headingCollector.d.ts",
      "import": "./utils/headingCollector.mjs",
      "require": "./utils/headingCollector.js"
    },
    "./utils/highlightColors": {
      "types": "./utils/highlightColors.d.ts",
      "import": "./utils/highlightColors.mjs",
      "require": "./utils/highlightColors.js"
    },
    "./utils/listState": {
      "types": "./utils/listState.d.ts",
      "import": "./utils/listState.mjs",
      "require": "./utils/listState.js"
    },
    "./utils/textSelection": {
      "types": "./utils/textSelection.d.ts",
      "import": "./utils/textSelection.mjs",
      "require": "./utils/textSelection.js"
    },
    "./utils/units": {
      "types": "./utils/units.d.ts",
      "import": "./utils/units.mjs",
      "require": "./utils/units.js"
    },
    "./managers/AutoSaveManager": {
      "types": "./managers/AutoSaveManager.d.ts",
      "import": "./managers/AutoSaveManager.mjs",
      "require": "./managers/AutoSaveManager.js"
    },
    "./managers/TableSelectionManager": {
      "types": "./managers/TableSelectionManager.d.ts",
      "import": "./managers/TableSelectionManager.mjs",
      "require": "./managers/TableSelectionManager.js"
    }
  }' '{
    "prosemirror-commands": "^1.7.1",
    "prosemirror-dropcursor": "^1.8.2",
    "prosemirror-history": "^1.5.0",
    "prosemirror-keymap": "^1.2.3",
    "prosemirror-model": "^1.25.7",
    "prosemirror-state": "^1.4.4",
    "prosemirror-tables": "^1.8.5",
    "prosemirror-transform": "^1.12.0",
    "prosemirror-view": "^1.41.8"
  }' 'false'

# React пакет
copy_package "react" "docx-editor-react" '{
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    },
    "./ui": {
      "types": "./ui.d.ts",
      "import": "./ui.mjs",
      "require": "./ui.js"
    },
    "./dialogs": {
      "types": "./dialogs.d.ts",
      "import": "./dialogs.mjs",
      "require": "./dialogs.js"
    },
    "./hooks": {
      "types": "./hooks.d.ts",
      "import": "./hooks.mjs",
      "require": "./hooks.js"
    },
    "./plugin-api": {
      "types": "./plugin-api.d.ts",
      "import": "./plugin-api.mjs",
      "require": "./plugin-api.js"
    },
    "./styles": {
      "types": "./styles.d.ts",
      "import": "./styles.mjs",
      "require": "./styles.js"
    },
    "./styles.css": "./styles.css"
  }' '{
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "prosemirror-commands": "^1.5.2",
    "prosemirror-dropcursor": "^1.8.2",
    "prosemirror-history": "^1.4.0",
    "prosemirror-keymap": "^1.2.2",
    "prosemirror-model": "^1.19.4",
    "prosemirror-state": "^1.4.3",
    "prosemirror-tables": "^1.8.5",
    "prosemirror-transform": "^1.12.0",
    "prosemirror-view": "^1.41.6"
  }' '["*.css"]'

# Создание .gitignore для vendor
echo -e "${BLUE}Создание .gitignore для vendor...${NC}"
cat > "$TARGET_PROJECT/vendor/.gitignore" << 'EOF'
# Vendor packages installed by install-to-project.sh
# These are copied from docx-editor repo and should not be committed
# Commit this .gitignore file instead
EOF

echo -e "${GREEN}✓ .gitignore создан${NC}"

# Вывод информации
echo ""
echo -e "${GREEN}=== Установка завершена успешно! ===${NC}"
echo ""
echo -e "${BLUE}Пакеты установлены в:${NC} $VENDOR_DIR"
echo ""
echo -e "${YELLOW}Следующие шаги:${NC}"
echo ""
echo "1. ${BLUE}Настрой алиасы в bundler (vite/webpack/esbuild):${NC}"
echo ""
echo "   // vite.config.ts"
echo "   resolve: {"
echo "     alias: {"
echo "       '@som/docx-editor-core': path.resolve(__dirname, 'vendor/@som/docx-editor-core'),"
echo "       '@som/docx-editor-react': path.resolve(__dirname, 'vendor/@som/docx-editor-react'),"
echo "       '@som/docx-editor-i18n': path.resolve(__dirname, 'vendor/@som/docx-editor-i18n')"
echo "     }"
echo "   }"
echo ""
echo "2. ${BLUE}Установи peer dependencies:${NC}"
echo "   npm install prosemirror-commands prosemirror-dropcursor prosemirror-history \\"
echo "     prosemirror-keymap prosemirror-model prosemirror-state prosemirror-tables \\"
echo "     prosemirror-transform prosemirror-view"
echo ""
echo "3. ${BLUE}Использование в коде:${NC}"
echo "   import { DocxEditor } from '@som/docx-editor-react';"
echo "   import '@som/docx-editor-react/styles.css';"
echo ""
echo -e "${YELLOW}Примечание:${NC} Директория vendor/@som добавлена в .gitignore"
echo "  Чтобы закоммитить пакеты в git, удали соответствующую строку из .gitignore"
echo ""
