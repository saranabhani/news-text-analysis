// set the color scale
var colorScale = d3.scaleOrdinal().range(["#7e4b95",
    "#7b762d",
    "#02ac63",
    "#332d50",
    "#536581",
    "#1a76f5",
    "#2c47b2",
    "#32e878",
    "#61ac8a",
    "#2edcb3",
    "#1860b0",
    "#c08b73",
    "#a879bc",
    "#0fd577",
    "#bba840",
    "#c504c3",
    "#2b289c",
    "#e71bc8",
    "#d6bd69",
    "#b40104",
    "#66203b",
    "#d07d19",
    "#275432",
    "#6a501f",
    "#a55985",
    "#c4102b",
    "#bab2c3",
    "#77fee6",
    "#c3ad66",
    "#6c55b5",
    "#d36b58",
    "#61b1c8",
    "#2e684a",
    "#194d12",
    "#f26df6",
    "#5623c7",
    "#f6774f",
    "#a17678",
    "#f67c80",
    "#f46ccf",
    "#909a22"
]);
// this function generates the bubble chart
const generateChartclust = data => {
    // format the data
    const formattedData = Object.keys(data).map(key => ({
        name: key,
        value: data[key].articles.length
    }));

    const bubble = d3.pack()
        .size([width, height])
        .padding(2);

    const svg = d3.select('#cluster-bubble-chart')
        .style('width', width)
        .style('height', height);

    const root = bubble(d3.hierarchy({children: formattedData}).sum(d => d.value));
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    const circle = node.append('circle')
        .style('fill', d => colorScale(d.data.name))
        .attr('r', d => d.r)
        .on('mouseover', function (e, d) {
            tooltip.select('span').attr('class', d.name).text(d.data.name);
            tooltip.style('visibility', 'visible');
            d3.select(this).style('stroke', '#222')

        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                     .style('left', `${e.pageX + 10}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })
        .on('click', (e, d) => {
            window.location.href = `/clu_details?cluster=${encodeURIComponent(d.data.name)}`;
        });

    const label = node.append('text')
        .attr('dy', 2)
        .text(d => d.data.name);

    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
};

(async () => {
    // get data
    const data = await d3.json(clusterdataPath);
    // call chart generator
    generateChartclust(data);
})();
