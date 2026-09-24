import React from 'react';
import { addons, types, useParameter } from 'storybook/manager-api';

function CodePreview() {
  const previews = useParameter('preview', []);
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
    {
      style: {
        alignSelf: 'stretch',
        background: 'inherit',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        width: '100%',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          alignItems: 'center',
          borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
          display: 'flex',
          flexShrink: 0,
          width: '100%',
        },
      },
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
      { style: { padding: '8px 14px 0', color: 'inherit', fontSize: 12, opacity: 0.7 } },
      selectedPreview.description,
    ),
    React.createElement(
      'pre',
      {
        style: {
          background: 'transparent',
          color: 'inherit',
          flex: 1,
          margin: 0,
          minHeight: 0,
          overflow: 'auto',
          padding: 16,
          whiteSpace: 'pre-wrap',
          width: '100%',
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
      {
        key,
        style: {
          alignSelf: 'stretch',
          display: active ? 'flex' : 'none',
          height: '100%',
          minHeight: 0,
          width: '100%',
        },
      },
      React.createElement(CodePreview),
    ),
  });
});
