const axios = require('axios');

/*
 * Teste de performance da API de fotos - REQUISIÇÕES REAIS
 * Faz chamadas reais para a API para medir performance real da rede
*/

describe('API Photos Performance Test - Requisições Reais', () => {
  // Aumentar timeout para requisições reais
  jest.setTimeout(15000); // 15 segundos para requisições reais

  test('deve medir o tempo REAL de busca das fotos da API', async () => {
    console.log('🧪 Iniciando teste de performance REAL da API...');
    console.log('📡 Fazendo requisição real para: https://picsum.photos/v2/list');
    console.log('🌐 Medindo performance real da rede...');

    // Medir o tempo de busca REAL da API
    const startTime = Date.now();
    
    try {
      // REQUISIÇÃO REAL para a API (igual ao aplicativo)
      const response = await axios.get('https://picsum.photos/v2/list');

      // Simula o processamento exato dos dados do app (slice para 10 itens)
      const limitedData = response.data.slice(0, 10);
      
      const endTime = Date.now();
      const fetchTime = endTime - startTime;
      
      console.log('\n📊 === RESULTADOS DA PERFORMANCE REAL ===');
      console.log(`⏱️  Tempo REAL de busca da API: ${fetchTime}ms`);
      console.log(`📡 Status da resposta: ${response.status}`);
      console.log(`� Total de fotos na API: ${response.data.length}`);
      console.log(`�📊 Quantidade de fotos processadas (igual ao app): ${limitedData.length}`);
      console.log(`🎯 Primeira foto: ${limitedData[0]?.author || 'N/A'}`);
      console.log(`🔗 URL da primeira foto: ${limitedData[0]?.download_url?.substring(0, 50)}...`);
      
      // Análise de performance real
      console.log('\n⚡ === ANÁLISE DE PERFORMANCE ===');
      if (fetchTime < 100) {
        console.log(`🚀 EXCELENTE: API muito rápida (${fetchTime}ms)`);
      } else if (fetchTime < 500) {
        console.log(`✅ BOM: Performance normal (${fetchTime}ms)`);
      } else if (fetchTime < 1000) {
        console.log(`⚠️  MODERADO: API um pouco lenta (${fetchTime}ms)`);
      } else if (fetchTime < 3000) {
        console.log(`🐌 LENTO: API lenta (${fetchTime}ms)`);
      } else {
        console.log(`❌ CRÍTICO: API muito lenta (${fetchTime}ms)`);
      }

      // Validações da requisição real
      expect(response.status).toBe(200); // Espera status 200 OK
      expect(response.data).toBeDefined(); // Espera que os dados estejam definidos
      expect(Array.isArray(response.data)).toBe(true); // Espera que os dados sejam um array
      expect(response.data.length).toBeGreaterThan(0); // Espera que haja pelo menos 1 foto
      expect(limitedData).toHaveLength(10); // Espera exatamente 10 fotos processadas
      expect(fetchTime).toBeGreaterThan(0); // Espera que o tempo seja maior que 0ms

      console.log('\n🔍 === VALIDAÇÃO DA ESTRUTURA REAL ===');
      // Verifica se a estrutura dos dados REAIS corresponde ao que o app espera
      limitedData.forEach((photo, index) => {
        expect(photo).toHaveProperty('id'); // Cada foto deve ter 'id'
        expect(photo).toHaveProperty('author'); // Cada foto deve ter 'author'
        expect(photo).toHaveProperty('download_url'); // Cada foto deve ter 'download_url'
        expect(typeof photo.id).toBe('string'); // 'id' deve ser string
        expect(typeof photo.author).toBe('string'); // 'author' deve ser string
        expect(typeof photo.download_url).toBe('string'); // 'download_url' deve ser string
        
        // Log das primeiras 3 fotos para verificação
        if (index < 3) {
          console.log(`📷 Foto ${index + 1}: ${photo.author} (ID: ${photo.id})`);
        }
      });
      
      console.log('\n✅ === TESTE CONCLUÍDO COM SUCESSO ===');
      console.log('🎯 Requisição real executada com sucesso!');
      console.log('📊 Dados validados e compatíveis com o aplicativo');
      console.log(`⏱️  Performance registrada: ${fetchTime}ms`);
      
    } catch (error) {
      console.error('\n❌ === ERRO NA REQUISIÇÃO REAL ===');
      console.error(`� Erro: ${error.message}`);
      
      // Diagnóstico detalhado do erro
      if (error.code === 'ENOTFOUND') {
        console.error('🌐 PROBLEMA: Sem conexão com a internet');
        console.error('💡 SOLUÇÃO: Verifique sua conexão de rede');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('� PROBLEMA: Conexão recusada');
        console.error('💡 SOLUÇÃO: A API pode estar indisponível');
      } else if (error.code === 'ETIMEDOUT') {
        console.error('⏰ PROBLEMA: Timeout na requisição');
        console.error('💡 SOLUÇÃO: API muito lenta ou rede instável');
      } else if (error.response) {
        console.error(`📡 PROBLEMA HTTP: ${error.response.status} - ${error.response.statusText}`);
        console.error('💡 SOLUÇÃO: Problema no servidor da API');
      } else {
        console.error('❓ PROBLEMA DESCONHECIDO:', error);
      }
      
      throw error;
    }
  });
});