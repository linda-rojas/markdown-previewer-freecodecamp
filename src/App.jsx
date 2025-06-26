import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.min.css';
import './App.css';
import { initialMarkdown } from './initialMarkdown.js';

// Configurar marked para usar highlight.js
marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [expandEditor, setExpandEditor] = useState(false);
  const [expandPreviewer, setExpandPreviewer] = useState(false);

  // Asegurar que highlight.js se aplique después de cada renderizado
  useEffect(() => {
    document.querySelectorAll('#preview pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [markdown]);

  return (
    <div className="container py-5">
      <div className={`row g-4 justify-content-center align-items-center flex-column${expandEditor || expandPreviewer ? ' expanded-section' : ''}`}> 
        {!expandPreviewer && (
          <div className={`col-md-5 mb-4${expandEditor ? ' col-12' : ''}`}> 
            <div className={`card h-100${expandEditor ? ' border-primary border-3' : ''}`}> 
              <div className="card-header bg-primary text-white d-flex align-items-center gap-2 position-relative">
                <img src="/logo-bg.png" alt="logo-freecodecamp" className="logo-header me-2" />
                <span className='fw-bold fs-5'>Editor</span>
                <button
                  className="btn btn-light btn-sm ms-auto icon-btn"
                  title={expandEditor ? 'Restore size' : 'Expanded Editor'}
                  onClick={() => setExpandEditor((v) => !v)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
              <div className="card-body">
                <textarea
                  id="editor"
                  className="form-control"
                  value={markdown}
                  onChange={e => setMarkdown(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        {!expandEditor && (
          <div className={`col-md-8${expandPreviewer ? ' col-12' : ''}`}> 
            <div className={`card previewer-card h-100${expandPreviewer ? ' border-success border-3' : ''}`}> 
              <div className="card-header bg-success text-white d-flex align-items-center gap-2 position-relative">
                <img src="/logo-bg.png" alt="logo-freecodecamp" className="logo-header me-2" />
                <span className='fw-bold fs-5'>Previewer</span>
                <button
                  className="btn btn-light btn-sm ms-auto icon-btn"
                  title={expandPreviewer ? 'Restore size' : 'Expanded Previewer'}
                  onClick={() => setExpandPreviewer((v) => !v)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
              <div className="card-body overflow-auto">
                <div
                  id="preview"
                  dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
