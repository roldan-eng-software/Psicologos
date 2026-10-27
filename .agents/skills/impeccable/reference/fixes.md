# Correções de Design para a Página de Psicóloga

## Problemas Identificados

1. **Zero-offset box-shadow glow**: Sombras coloridas com desfoque em zero offset
2. **Icon-tile-stack**: Ícones em containers quadrados acima de títulos
3. **Hero-eyebrow-chip**: Etiqueta em maiúsculas acima do título principal
4. **Cramped-padding**: Espaçamento insuficiente em seções
5. **Overused-font**: Uso de fontes comuns em excesso
6. **Pulsing-dot**: Ponto pulsante como indicador
7. **Dark-glow**: Sombras coloridas em fundo escuro

## Correções Propostas

1. **Substituir sombras coloridas**:
   - Remover sombras com desfoque zero
   - Usar sombras neutras e sutis para elevar elementos

2. **Reestruturar os cards de serviços**:
   - Remover os containers quadrados dos ícones
   - Posicionar ícones ao lado dos títulos

3. **Redesenhar o hero**:
   - Integrar a etiqueta no título principal
   - Remover o chip de eyebrow

4. **Aumentar espaçamento**:
   - Adicionar pelo menos 12px de padding interno em containers com bordas

5. **Escolher uma fonte mais distinta**:
   - Substituir Plus Jakarta Sans por uma fonte mais única

6. **Substituir o ponto pulsante**:
   - Usar um indicador estático com label claro

7. **Revisar sombras em fundo escuro**:
   - Usar sombras neutras em vez de coloridas

## Implementação

Para aplicar essas correções, siga os passos abaixo:

1. Abra o arquivo `styles.css`
2. Localize as classes e elementos mencionados nos problemas
3. Aplique as alterações conforme descrito nas correções
4. Teste visualmente para garantir que as melhorias foram aplicadas corretamente