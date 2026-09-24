import React from 'react';
import { addons, types, useParameter } from 'storybook/manager-api';

type PreviewItem = {
  tab?: string;
  template?: string;
  language?: string;
  description?: string;
  copy?: boolean;
};

function CodePreview() {
  const previews = useParameter<PreviewItem[]>('preview', []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const selectedPreview = previews[selectedIndex] ?? previews[0];

  if (previews.length === 0) {
    return React.createElement(
      'div',
      { style: { padding: 16, color: '#666' } },
      'Esta historia no tiene código de preview.',
    );
  }

  const copyCode = async () => {
    if (!selectedPreview?.template) return;
    await navigator.clipboard.writeText(selectedPreview.template);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return React.createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 } },
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb' } },
      previews.map((preview, index) => React.createElement(
        'button',
        {
          key: preview.tab ?? index,
          type: 'button',
          onClick: () => {
            setSelectedIndex(index);
            setCopied(false);
          },
          style: {
            border: 0,
            borderBottom: index === selectedIndex ? '2px solid #1ea7fd' : '2px solid transparent',
            background: 'transparent',
            color: index === selectedIndex ? '#1ea7fd' : '#666',
            cursor: 'pointer',
            padding: '10px 14px',
            fontWeight: 600,
          },
        },
        preview.tab ?? `Preview ${index + 1}`,
      )),
      selectedPreview?.copy !== false && React.createElement(
        'button',
        {
          type: 'button',
          onClick: copyCode,
          style: { marginLeft: 'auto', marginRight: 10, padding: '5px 10px', cursor: 'pointer' },
        },
        copied ? 'Copiado' : 'Copiar',
      ),
    ),
    selectedPreview?.description && React.createElement(
      'div',
      { style: { padding: '8px 14px 0', color: '#666', fontSize: 12 } },
      selectedPreview.description,
    ),
    React.createElement(
      'pre',
      {
        style: {
          background: '#1f2430',
          color: '#f8f8f2',
          flex: 1,
          margin: 0,
          minHeight: 0,
          overflow: 'auto',
          padding: 16,
          whiteSpace: 'pre-wrap',
        },
      },
      React.createElement('code', null, selectedPreview?.template ?? ''),
    ),
  );
}

addons.register('mi-app/code-preview', () => {
  addons.add('mi-app/code-preview/panel', {
    title: 'Code Preview',
    type: types.PANEL,
    render: ({ active, key }) => React.createElement(
      'div',
      { key, style: { display: active ? 'flex' : 'none', height: '100%', minHeight: 0 } },
      React.createElement(CodePreview),
    ),
  });
});
