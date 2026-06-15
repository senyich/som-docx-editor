# SOM Docx Editor

Monorepo с DOCX редактором на React. Состоит из 4 пакетов:
- `@som/docx-editor-i18n` — локализация
- `@som/docx-editor-core` — ядро (парсер, сериалайзер, плагины)
- `@som/docx-editor-react` — React компоненты и UI
- `@som/docx-editor-agents` — зависимости для работы редактора,  позже выпилю их

---

## Быстрый старт для работы

### 1. Сборка библиотеки

```bash
# Установка зависимостей
bun install
# Сборка всех пакетов
bun run build:packages
```

### 2. Подключение в проект


#### Вариант A: Через vendor (локальная копия)

```bash
# Скопируй собранные пакеты в vendor/
cp -r packages/core /your-project/vendor/@som/docx-editor-core
cp -r packages/react /your-project/vendor/@som/docx-editor-react
cp -r packages/react /your-project/vendor/@som/docx-editor-i18n

```

#### Вариант Б: Через относительный путь (щас работает) 
```json
"@som/docx-editor-core": "file:../som-docx-editor/packages/core",
  "@som/docx-editor-i18n": "file:../som-docx-editor/packages/i18n",
  "@som/docx-editor-react": "file:../som-docx-editor/packages/react",
    
```
### 3. Обязательные импорты стилей

```jsx
// В ГЛАВНОМ файле приложения (App.jsx/main.jsx) ИЛИ в компоненте с редактором:
import "@som/docx-editor-core/prosemirror/editor.css";
import "@som/docx-editor-react/styles.css";
```

**Без этих стилей редактор будет неработоспособен!**

---

## Импорты компонентов

### Базовый редактор (readonly)

```jsx
import { DocxEditor } from "@som/docx-editor-react";
import { ru } from "@som/docx-editor-i18n";
function App() {
  return (
    <DocxEditor
      documentBuffer={arrayBuffer}
      readOnly={true}
      mode="readonly"
      i18n={ru} //локальизация редактора
    />
  );
}
```

### Редактор с плагинами (шаблоны)

```jsx
import { DocxEditor } from "@som/docx-editor-react";
import { PluginHost, templatePlugin } from "@som/docx-editor-react/plugin-api";

function App() {
  return (
    <PluginHost plugins={[templatePlugin]}>
      <DocxEditor
        documentBuffer={arrayBuffer}
        readOnly={false}
        mode="editing"
        author="Пользователь"
        onChange={() => console.log('changed')}
        onReady={() => console.log('ready')}
        onError={(err) => console.error(err)}
        showAnnotations={false}
      />
    </PluginHost>
  );
}
```

### Все доступные импорты

```jsx
// ========== Основной пакет ==========
import { DocxEditor } from "@som/docx-editor-react";
import { renderAsync } from "@som/docx-editor-react";
import { createEmptyDocument, createDocumentWithText } from "@som/docx-editor-react";
import { LocaleProvider, useTranslation } from "@som/docx-editor-react";

// ========== Plugin API ==========
import { 
  PluginHost, 
  templatePlugin,
  createTemplatePlugin,
  templatePluginKey,
  getTemplatePluginTags,
  setHoveredElement,
  setSelectedElement
} from "@som/docx-editor-react/plugin-api";

// ========== UI компоненты ==========
import { 
  Toolbar,
  ToolbarButton,
  // ... другие UI компоненты
} from "@som/docx-editor-react/ui";

// ========== Диалоги ==========
import {
  FindReplaceDialog,
  HyperlinkDialog,
  // ... другие диалоги
} from "@som/docx-editor-react/dialogs";

// ========== Хуки ==========
import {
  useEditor,
  useSelection,
  // ... другие хуки
} from "@som/docx-editor-react/hooks";

// ========== Стили (CSS) ==========
import "@som/docx-editor-react/styles.css";

// ========== Core (если нужен низкоуровневый API) ==========
import { parseDocx, serializeDocx } from "@som/docx-editor-core";
import { processTemplate, getTemplateTags } from "@som/docx-editor-core";
```

---

## Props DocxEditor

| Prop | Тип | Описание |
|------|-----|----------|
| `documentBuffer` | `ArrayBuffer` | DOCX файл в виде ArrayBuffer |
| `readOnly` | `boolean` | Только чтение или редактирование |
| `mode` | `"editing" \| "readonly"` | Режим работы |
| `author` | `string` | Имя автора для track changes |
| `onChange` | `() => void` | Callback при изменении документа |
| `onReady` | `() => void` | Callback когда редактор готов |
| `onError` | `(error) => void` | Callback при ошибке |
| `showAnnotations` | `boolean` | Показывать комментарии |

---

## Полный пример компонента

---

## Структура пакетов

```
packages/
├── i18n/           # Локализации (en, ru, de, fr...)
├── core/           # Ядро - парсер, сериалайзер, плагины
│   └── dist/
│       └── prosemirror/
│           └── editor.css    # ← Стили редактора (ОБЯЗАТЕЛЬНО)
├── react/          # React компоненты и UI
    └── dist/
        └── styles.css        # ← Стили UI (ОБЯЗАТЕЛЬНО)
```

---

## Ошибки с которыми я столкнулся пока бился с библиотекой
### "No matching export in ... for import ..."
**Причина:** Импортируешь из неправильного пакета  
**Решение:** 
- `DocxEditor` → из `@som/docx-editor-react`
- `PluginHost`, `templatePlugin` → из `@som/docx-editor-react/plugin-api`
- `parseDocx`, `serializeDocx` → из `@som/docx-editor-core`


### "Missing './plugins/template' specifier"
**Причина:** Неправильный путь к templatePlugin  
**Решение:**
```jsx
// Правильныйй импорт:
import { templatePlugin } from "@som/docx-editor-react/plugin-api";
```

---

## Сборка и подготовка к vendor-интеграции

Перед переносом библиотеки в папку vendor основного проекта убедись, что она корректно собрана.

### Команды для сборки

```bash
bun install           # Установка зависимостей
bun run build:packages # Сборка всех пакетов
```

### Что переносится в vendor

**Включаются:**
- `package.json` с корректными полями main, module и types
- папка `dist` со скомпилированными файлами
---

- Репозиторий: https://github.com/senyich/som-docx-editor
