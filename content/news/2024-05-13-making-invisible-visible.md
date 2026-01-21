Making the invisible visible in causality: a new algorithm to identify causal graphs involving both observed and latent variables  
Monday, May 13, 2024

Original: https://mbzuai.ac.ae/news/making-the-invisible-visible-in-causality/  
Image: https://staticcdn.mbzuai.ac.ae/mbzuaiwpprd01/2024/05/Data-1295x728-1.jpg

One potential hugely beneficial application of artificial intelligence is the development of systems that have the ability to analyze huge sets of data and identify causal relationships, or how one action leads to another. These kinds of systems could provide great utility in a field like medicine that is characterized by complex interactions between a person’s biology and the environment. For example, a better understanding of causality as it relates to disease may allow for the creation of drugs to treat a disease or lifestyle changes that could prevent or delay its onset.

The trouble with causality, however, particularly in complex systems like the human body, is that it is difficult to determine. One way to identify a cause-and-effect relationship is to conduct a randomized controlled trial, in which scientists intervene on one variable to see if the target variable changes. Illuminating the true relationship between variables in the chain of causality requires establishing their basic relationships and ruling out irrelevant factors. Both are difficult to do and time-intensive when possible. Some biological intervention experiments may also have ethical issues.

That said, the study of causal relationships has a long history in fields like statistics, artificial intelligence and even in philosophy. Scientists who study causality have developed so-called causal discovery methods aimed at discovering causal relationships from observable (non-intervention) data alone, without the need for intervening experiments, and output so-called causal graphs that show how variables influence each other.

A major challenge, however, is that what can be directly quantified, so called observed (measured) variables, aren’t always representative of the full story. Latent variables, as they’re called, can’t be observed directly but influence causal relationships.

A team of researchers from Mohamed Bin Zayed University of Artificial Intelligence and other institutions recently put together a study that proposes a new algorithm that can locate latent variables and identify causal relationships among both observed and latent variables by leveraging observable (non-intervention) data alone.

The study was presented at the Twelfth International Conference on Learning Representations (ICLR 2024), which took place in Vienna between May 7-11.

There are methods for determining causality in data, but they tend to break down in the presence of latent variables. There are also other methods that can handle latent variables but work on the assumption that observed (measured) variables don’t directly influence latent variables in a causal graph. The algorithm proposed in this study can accommodate both scenarios, as well as more general situations.

Songyao Jin, a second-year master’s student at MBZUAI and lead author of the study, said, “Our goal is to provide a causal discovery approach that discovers the causal graph where observed and latent variables may interact in arbitrary ways. That is, both observed and latent variables can influence each other.”

Other authors are Feng Xie of Beijing Technology and Business University, Biwei Huang of University of California San Diego, Xinshuai Dong of Carnegie Mellon University, and Guangyi Chen, Zhengming Chen and Kun Zhang of MBZUAI.

One reason that researchers are interested to study causality, beyond the larger theoretical implications, is for use in unsupervised learning, where a large set of data is provided to a machine and the machine attempts to identify patterns in the data without the help of labels or other aids from humans. Unsupervised learning can be used to analyze medical or biological data and potentially help identify causality in data sets that are too big or complex to be analyzed by people.

It’s a promising application because, with health-related data, there is the possibility that interventions informed by artificial intelligence could result in positive change for patients. “If you know the causal relationship between variables, you can make a change to the causal variable,” Jin explained.

In the study, the researchers tested their algorithm on both synthetic and real-world data sets. They note that their algorithm “performs well with all structures” in the synthetic data set, “which proves that it can deal with general causal structures.” With the real-world data set, the system discovers causal relationships consistent with expert domain knowledge.

Considering what’s next for this line of research, Jin noted that one potential direction is for the approach to be extended to identify non-linear relationships — this study only looks at linear relationships. Another direction is applying the algorithm to data from different domains and discover unknown useful patterns.
