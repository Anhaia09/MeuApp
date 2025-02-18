# React Native  

## 📌 O que é o React Native?  
O **React Native** é um framework de código aberto desenvolvido pelo Facebook (agora Meta) que permite o desenvolvimento de aplicativos móveis para **iOS** e **Android** utilizando **JavaScript** e **React**. Ele possibilita a criação de interfaces de usuário declarativas e reutilizáveis, semelhantes às desenvolvidas para a web com React, mas traduzidas para componentes nativos da plataforma.  

## 🔹 Arquitetura do React Native  

O React Native adota uma arquitetura baseada em **três camadas principais**:  

1. **JavaScript Thread:** Onde o código escrito em React Native é executado. O JavaScript interage com os componentes da interface do usuário e a lógica do aplicativo.  
2. **Bridge (Ponte):** Responsável pela comunicação entre o código JavaScript e o código nativo da plataforma.  
3. **Native Thread:** Onde os componentes nativos são renderizados e executados em código específico de cada sistema operacional (Objective-C/Swift no iOS e Java/Kotlin no Android).  

A ponte **permite a troca de mensagens assíncronas** entre JavaScript e o código nativo, garantindo a interação entre as camadas sem bloquear a interface do usuário.  

## ⚙️ Como o React Native Gera Código Nativo?  

Diferente de frameworks que utilizam **WebView**, o React Native **não renderiza HTML** dentro de um navegador embutido. Em vez disso, ele traduz componentes escritos em **React** para **componentes nativos reais**.  

1. O código JavaScript é interpretado pela **JavaScript Engine** (como Hermes, JSC ou V8).  
2. A **Bridge** transmite comandos para as APIs nativas.  
3. As APIs nativas criam e manipulam componentes reais da interface, como botões, inputs e listas.  

Isso permite que os aplicativos React Native tenham desempenho próximo ao de aplicativos totalmente nativos, mantendo a flexibilidade do desenvolvimento em JavaScript.  

## 🛠️ Benefícios do React Native  

✔ **Código compartilhável entre iOS e Android**  
✔ **Hot Reload e Fast Refresh** (atualização instantânea durante o desenvolvimento)  
✔ **Ecosistema forte com muitas bibliotecas**  
✔ **Integração com código nativo quando necessário**  

O React Native é uma solução eficiente para desenvolvedores que desejam criar aplicativos móveis modernos sem precisar escrever código separado para cada plataforma. 🚀  
