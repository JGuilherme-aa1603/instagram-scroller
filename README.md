# 📱 Instagram Scroller - Aplicativo React Native

Aplicativo mobile estilo Instagram desenvolvido com React Native e Expo, simulando um feed infinito de fotos com scroll vertical.

## 🚀 Funcionalidades

- ✅ Feed vertical de fotos (estilo Instagram/TikTok)
- ✅ Carregamento otimizado de imagens
- ✅ Cache de dados da API
- ✅ Interface responsiva e moderna
- ✅ Detecção automática de rede lenta
- ✅ Indicadores visuais de carregamento

## 📦 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Axios** - Requisições HTTP
- **AsyncStorage** - Armazenamento local
- **Picsum Photos API** - Fonte de imagens

## 🔧 Instalação

```bash
# Instalar dependências
npm install
# ou
yarn install
```

## ▶️ Executar o Aplicativo

```bash
# Iniciar servidor Expo
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no navegador
npm run web
```

## 🧪 Testes de Carga (JMeter)

Este projeto inclui testes de carga para validar a performance da API.

### Executar Teste de Carga:

```bash
npm run jmeter
```

### Abrir Interface Gráfica do JMeter:

```bash
apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat
```

Depois abra: `jmeter-tests/API-LoadTest.jmx`

### Configuração do Teste:
- **50 usuários simultâneos**
- **10 requisições por usuário**
- **500 requisições totais**
- **Validação de status e JSON**

📚 **Documentação completa**: Ver `jmeter-tests/JMETER_GUIDE.md`

## 📊 Performance

### Otimizações Implementadas:
- ✅ URLs de imagens otimizadas (400x600px)
- ✅ Cache inteligente de dados
- ✅ Carregamento progressivo
- ✅ Lazy loading de imagens
- ✅ Detecção de rede lenta

### Métricas:
- **Tempo de resposta da API**: ~400-600ms
- **Tamanho das imagens**: 50-100KB (vs 2-3MB original)
- **Cache**: 1 hora
- **Performance**: 95% de melhoria

📚 **Documentação de otimizações**: Ver `PERFORMANCE_OPTIMIZATIONS.md`

## 📁 Estrutura do Projeto

```
instagram-scroller/
├── App.js                       # Componente principal
├── index.js                     # Entry point
├── assets/                      # Imagens e recursos
├── jmeter-tests/               # Testes de carga
│   ├── API-LoadTest.jmx        # Plano de teste JMeter
│   ├── JMETER_GUIDE.md         # Guia do JMeter
│   └── MIGRATION_NOTES.md      # Notas de migração
├── apache-jmeter-5.6.3/        # JMeter instalado
├── package.json                # Dependências
└── README.md                   # Este arquivo
```

## 🎯 API Utilizada

**Picsum Photos API**
- Endpoint: `https://picsum.photos/v2/list`
- Retorna: Array de objetos com fotos
- Campos: `id`, `author`, `download_url`

## 🔗 Links Úteis

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [JMeter Documentation](https://jmeter.apache.org/usermanual/index.html)
- [Picsum Photos API](https://picsum.photos/)

## 📝 Notas

- Use o Expo Go app no celular para testar via QR Code
- Para produção, gere um APK/IPA
- Testes de carga requerem JMeter instalado
- Cache é mantido por 1 hora no dispositivo

## 🎓 Apresentação Acadêmica

Este projeto foi desenvolvido para demonstrar:
- ✅ Desenvolvimento mobile com React Native
- ✅ Integração com APIs REST
- ✅ Otimização de performance
- ✅ Testes de carga com JMeter
- ✅ Boas práticas de desenvolvimento

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico.

## 📄 Licença

0BSD - Open Source

---

**Desenvolvido com ❤️ usando React Native + Expo**
