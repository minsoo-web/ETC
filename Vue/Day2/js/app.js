const EventBus = new Vue();

Vue.component("result-component", {
  template: `
        <div>
            <h2>저희 은행을 방문해 주셔서 감사합니다.</h2>
            <p>현재 대기자 수 :{{ count }} 입니다.</p>
        </div>
    `,
  data() {
    return {
      count: 0,
    };
  },
  created() {
    EventBus.$on("subtract", () => {
      if (this.count >= 1) {
        this.count--;
      }
    });
    EventBus.$on("add", () => {
      this.count++;
    });
  },
});

Vue.component("cust-component", {
  template: `
  <div>
      <button @click="add">대기표 뽑기</button> 
      <button @click="subtract">서비스 처리 완료</button> 
  </div>`,
  methods: {
    add() {
      EventBus.$emit("add");
    },
    subtract() {
      EventBus.$emit("subtract");
    },
  },
});

new Vue({
  el: "#app",
});
