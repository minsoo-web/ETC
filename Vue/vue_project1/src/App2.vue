<template>
  <div id="app">
    <h1>책방 도서 목록</h1>
    <table border="1">
      <thead>
        <tr>
          <th>도서 번호</th>
          <th>도서 이름</th>
          <th>출판사</th>
          <th>저자</th>
          <th>재고량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in books" v-bind:key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.publisher}}</td>
          <td>{{item.author}}</td>
          <td>{{item.stock}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      books: [
        {
          id: 1,
          title: "book1",
          publisher: "출판사1",
          author: "book1 저자",
          stock: 0
        },
        {
          id: 2,
          title: "book2",
          publisher: "출판사2",
          author: "book2 저자",
          stock: 0
        },
        {
          id: 3,
          title: "book3",
          publisher: "출판사3",
          author: "book3 저자",
          stock: 0
        },
        {
          id: 4,
          title: "book4",
          publisher: "출판사4",
          author: "book4 저자",
          stock: 0
        },
        {
          id: 5,
          title: "book5",
          publisher: "출판사5",
          author: "book5 저자",
          stock: 0
        }
      ]
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
tr:nth-of-type(odd) {
  background: #e0e0e0;
}
th {
  background: #e9e9e9;
}
td,
th {
  padding: 5px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>