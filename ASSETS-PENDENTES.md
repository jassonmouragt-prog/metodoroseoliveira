# Materiais oficiais para finalizar a página

Os banners oficiais de desktop e mobile, a logo do Método Rose Oliveira, a foto da Rose e o mockup ilustrativo da plataforma foram recebidos e integrados. Permanecem pendentes os seguintes materiais para os espaços reservados:

O vídeo enviado para “O momento que importa” foi convertido de 16,3 MB para cerca de 7,3 MB (`public/video-rose-leve.mp4`), com poster extraído do próprio vídeo (`public/video-rose-poster.jpg`). O arquivo original permanece na raiz do projeto.

- PDF/manual de identidade para conferência final de cores, uso da marca e tipografia.
- Três pares de antes/depois reais da Rose, com duas fotos do mesmo atendimento em cada par. O carrossel em `app/transformations.tsx` já está preparado: salvar fotos autorizadas em `public/transformacoes/` e preencher `before`, `after` e, se houver, `description` de cada entrada. O componente usa `next/image` automaticamente quando os caminhos existem.
- Confirmação dos recursos escritos no mockup recebido (módulos, comunidade, bônus exclusivos e suporte), ou uma versão revisada da imagem sem afirmações não verificadas. O site o identifica como ilustrativo até essa confirmação.
- Conteúdo real das aulas/módulos para substituir os marcadores entre colchetes.
- Preço vigente, prazo de acesso, garantia, suporte, contato e links legais oficiais, se aplicáveis.
- Depoimentos e números comprovados, se forem publicados futuramente.

Os botões de compra agora usam a URL direta `pay.hotmart.com` enviada pelo usuário. As outras áreas fotográficas ainda aguardam registros reais. Seções de números, depoimentos e garantia não são renderizadas até receber dados verificados.
