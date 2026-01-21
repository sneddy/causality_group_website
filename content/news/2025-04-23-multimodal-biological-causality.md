Uncovering causal relationships in multimodal biological data: A new framework presented at ICLR  
Wednesday, April 23, 2025

Original: https://mbzuai.ac.ae/news/uncovering-causal-relationships-in-multimodal-biological-data-a-new-framework-presented-at-iclr/  
Image: https://staticcdn.mbzuai.ac.ae/mbzuaiwpprd01/2024/08/data-stock-image-1.jpg

Yuewen Sun is a postdoctoral researcher at MBZUAI working in an area of machine learning known as causal representation learning, which focuses on uncovering how hidden, or latent, variables influence complex systems. Sun and colleagues from MBZUAI and other institutions recently published a study that addresses an important challenge in biomedical research: identifying underlying causal factors when observed data — such as lab tests, genetic information, and medical images — are indirect reflections of deeper biological mechanisms.

This is complicated by the fact that biomedical data are often multimodal; they include images, tables, and time-series information. Most existing machine-learning methods are not designed to infer causal relationships across these different types of data. In their study, however, Sun and colleagues propose a new approach that can do just that. By applying it to both synthetic and real-world datasets, the researchers demonstrated their model’s ability to identify latent causal variables and their influence on observed biological outcomes. They were also able to analyze the influence that causal mechanisms had between different modalities.

“Traditional machine learning analyzes each type of data separately and draws conclusions based on these analyses,” Sun explains. “But these methods may overlook interactions between different modalities, leading to incomplete or even misleading insights.”

The team’s findings will be presented at the 13th International Conference on Learning Representation (ICLR), which will be held at the end of April in Singapore. Guangyi Chen, Loka Li, Gongxu Luo, Zijian Li, Yixuan Zhang, Eran Segal, Eric Xing, and Kun Zhang of MBZUAI contributed to the study.

### Multimodal analysis and interpretability

The team’s goal was to identify latent causal variables that underlie different modalities and the relations between the variables. In biology, latent variables might include things like genetic traits or biological phenomena that can’t be measured directly but leave their fingerprints on observed data.

When researchers develop causal representation learning methods, they make assumptions about how their models will interpret data. Many previous approaches for multimodal datasets face some limitations: they either rely on restrictive assumptions — such as latent independence or specific parametric families — or they are limited to block-wise identifiability, making it difficult to capture complex causal effects across modalities.

In contrast, Sun and her coauthors adopted an approach that is more flexible. It assumes that latent causal variables in one modality will have some influence on latent variables in another modality, but these relationships are sparse, meaning that one variable only influences a few others.

Machine-learning scientists often strive to develop systems that are interpretable, meaning that humans can understand how they arrive at their results. And yet, many models behave like black boxes. This is fine in some situations, particularly when the stakes are low — take, for example, recommendations on a streaming platform. But that’s not the case for systems designed to analyze biological data. Biomedical researchers and physicians require systems that can help them understand how results are produced. “For clinical decisions, we need to have a causal route for how machines arrive at answers,” Sun says.

### Testing the model

The team tested their method on synthetic datasets and a real-world dataset of human health measurements. In each case, the model was able to recover the latent causal variables and map out the relationships between them more accurately than existing approaches.

Synthetic datasets play an important role in causal representation learning, providing an element of “ground-truth” that isn’t apparent in real-world datasets. The researchers used their model to analyze the synthetic datasets and compared its findings to the ground truth, finding that it was able to identify causal relationships between latent variables.

On the real-world dataset, the model identified insights into the relationships between modalities and those that aligned with known medical findings. It found, for example, that sleep patterns are causally linked to blood oxygen levels, and that age affects eye health. It also uncovered a less obvious connection between eye images and grip strength, a relationship that has been discovered by biomedical researchers.

Overall, the team’s study shows how a more flexible and interpretable machine-learning framework can improve scientists’ ability to make sense of complex biomedical data, offering a path toward more transparent and reliable AI systems for research and clinical decision-making.

### Benefits of interdisciplinary research

Before becoming interested in causal representation learning, Sun focused on causal discovery, a related field which identifies causal relationships among variables that can be observed in data. She turned to causal representation learning, however, because it deals with situations where true causal variables aren’t directly observed but must be inferred from observations, which is common in real-world datasets. “When we have large-scale datasets of observational data, there should always be latent variables that play a role,” she says.

Sun described this work as a collaboration with researchers from Carnegie Mellon University, University of Bristol, and the Broad Institute of MIT and Harvard, one of the world’s leading centers dedicated to improving human health. Through the collaboration, she learned about some of the most urgent questions biomedical researchers are currently trying to answer. The biomedical researchers, in turn, benefited by learning about recent advances in the study of causality.

In the future, she hopes to build more connections between the two areas of study and conduct “research that benefits a broader group of scientists beyond the causality community,” she says.
